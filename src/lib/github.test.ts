import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearStatsCache, fetchStats, longestStreak } from './github';

const lastYear = {
	totalContributions: 3,
	weeks: [{ contributionDays: [{ date: '2026-10-20', contributionCount: 3 }] }],
};

const yearsResponse = { data: { user: { contributionsCollection: { contributionYears: [2026, 2025] } } } };

const statsResponse = {
	data: {
		user: {
			followers: { totalCount: 4 },
			following: { totalCount: 2 },
			y2026: {
				totalCommitContributions: 10,
				contributionCalendar: {
					weeks: [{ contributionDays: [{ date: '2026-01-01', contributionCount: 1 }, { date: '2026-01-02', contributionCount: 2 }] }],
				},
			},
			y2025: {
				totalCommitContributions: 5,
				contributionCalendar: {
					weeks: [{ contributionDays: [{ date: '2025-12-31', contributionCount: 1 }] }],
				},
			},
			lastYear: { contributionCalendar: lastYear },
		},
	},
};

// Each call to fetch resolves with the next body in order.
function mockFetch(...responses: { body: unknown; status?: number }[]) {
	const fetchMock = vi.fn();
	for (const { body, status = 200 } of responses) {
		fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body), { status }));
	}
	vi.stubGlobal('fetch', fetchMock);
	return fetchMock;
}

beforeEach(() => {
	clearStatsCache();
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	vi.unstubAllEnvs();
});

describe('fetchStats', () => {
	it('queries the years, then one aliased query, and combines the results', async () => {
		vi.stubEnv('GITHUB_TOKEN', 'test-token');
		const fetchMock = mockFetch({ body: yearsResponse }, { body: statsResponse });

		const result = await fetchStats();
		const [url, init] = fetchMock.mock.calls[0];
		const statsQuery = JSON.parse(fetchMock.mock.calls[1][1].body).query;

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(url).toBe('https://api.github.com/graphql');
		expect(init.method).toBe('POST');
		expect(init.headers.Authorization).toBe('Bearer test-token');
		expect(init.headers['Content-Type']).toBe('application/json');
		expect(statsQuery).toContain('y2026:');
		expect(statsQuery).toContain('y2025:');
		expect(statsQuery).toContain('lastYear:');
		expect(result).toEqual({
			totalCommits: 15,
			longestStreak: { days: 3, start: '2025-12-31', end: '2026-01-02' },
			currentStreak: 1,
			followers: 4,
			following: 2,
			lastYear,
		});
	});

	// Errors return null so the page can show its fallback instead of failing the build.
	it('returns null when GraphQL returns errors with a 200 status', async () => {
		vi.stubEnv('GITHUB_TOKEN', 'test-token');
		mockFetch({ body: { errors: [{ message: 'Field "foo" does not exist' }] } });

		expect(await fetchStats()).toBeNull();
		expect(console.error).toHaveBeenCalledWith('Error fetching GitHub stats:', 'Field "foo" does not exist');
	});

	it('returns null when the HTTP request fails', async () => {
		vi.stubEnv('GITHUB_TOKEN', 'bad-token');
		mockFetch({ body: { message: 'Bad credentials' }, status: 401 });

		expect(await fetchStats()).toBeNull();
		expect(console.error).toHaveBeenCalledWith('Error fetching GitHub stats:', 'GitHub request failed with status 401');
	});
});

describe('longestStreak', () => {
	const day = (date: string, contributionCount: number) => ({ date, contributionCount });

	it('counts a run that crosses a year boundary', () => {
		const days = [day('2024-12-30', 1), day('2024-12-31', 2), day('2025-01-01', 1), day('2025-01-02', 0)];
		expect(longestStreak(days)).toEqual({ days: 3, start: '2024-12-30', end: '2025-01-01' });
	});

	it('resets on a zero-contribution day', () => {
		const days = [day('2025-03-01', 1), day('2025-03-02', 0), day('2025-03-03', 1), day('2025-03-04', 1)];
		expect(longestStreak(days)).toEqual({ days: 2, start: '2025-03-03', end: '2025-03-04' });
	});

	it('resets when a date is missing', () => {
		const days = [day('2025-05-01', 1), day('2025-05-02', 1), day('2025-05-04', 1)];
		expect(longestStreak(days)).toEqual({ days: 2, start: '2025-05-01', end: '2025-05-02' });
	});

	it('picks the most recent run when two are the same length', () => {
		const days = [day('2025-02-01', 1), day('2025-02-02', 1), day('2025-02-03', 0), day('2025-02-04', 1), day('2025-02-05', 1)];
		expect(longestStreak(days)).toEqual({ days: 2, start: '2025-02-04', end: '2025-02-05' });
	});

	it('returns zero when there are no contributions', () => {
		expect(longestStreak([day('2025-01-01', 0)])).toEqual({ days: 0, start: null, end: null });
	});
});
