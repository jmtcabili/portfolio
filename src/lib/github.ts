export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface LongestStreak {
  days: number;
  start: string | null;
  end: string | null;
}

export interface GitHubStats {
  totalCommits: number;
  longestStreak: LongestStreak;
  currentStreak: number;
  followers: number;
  following: number;
  lastYear: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
}

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

// Without from/to, contributionsCollection covers only the last 12 months. So the all-time totals take
// two requests: first the years with contributions, then one query with an aliased collection per year.
const CONTRIBUTION_YEARS_QUERY = `
  query GetContributionYears($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionYears
      }
    }
  }
`;

function buildStatsQuery(years: number[]): string {
  const perYear = years
    .map(
      (year) => `
      y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
        totalCommitContributions
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }`,
    )
    .join('');

  return `
  query GetGitHubStats($username: String!) {
    user(login: $username) {
      followers {
        totalCount
      }
      following {
        totalCount
      }
      ${perYear}
      lastYear: contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;
}

async function graphql(token: string, query: string, variables: Record<string, unknown>) {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Astro-Portfolio',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0]?.message || 'GraphQL Query Error');
  }
  return json.data;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Longest run of consecutive contribution days. A missing date breaks the run, so years can be joined safely.
 * Days must be sorted oldest first. On a tie, the most recent run wins.
 */
export function longestStreak(days: Pick<ContributionDay, 'date' | 'contributionCount'>[]): LongestStreak {
  let best: LongestStreak = { days: 0, start: null, end: null };
  let runLength = 0;
  let runStart: string | null = null;
  let previous: number | null = null;

  for (const day of days) {
    const time = Date.parse(`${day.date}T00:00:00Z`);
    const consecutive = previous !== null && time - previous === DAY_MS;

    if (day.contributionCount > 0) {
      if (!consecutive || runLength === 0) {
        runLength = 0;
        runStart = day.date;
      }
      runLength++;
      if (runLength >= best.days) {
        best = { days: runLength, start: runStart, end: day.date };
      }
    } else {
      runLength = 0;
    }
    previous = time;
  }

  return best;
}

// In-memory cache to prevent multiple fetches during dev session
let memoryCache: { data: GitHubStats; timestamp: number } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes

/** Clears the in-memory cache. For tests. */
export function clearStatsCache() {
  memoryCache = null;
}

/** Consecutive contribution days ending today, or yesterday if today has none yet. */
function currentStreak(days: ContributionDay[]): number {
  let currentStreak = 0;
  let checkIndex = days.length - 1;

  if (checkIndex >= 0 && days[checkIndex].contributionCount === 0) {
    checkIndex--;
  }

  while (checkIndex >= 0 && days[checkIndex].contributionCount > 0) {
    currentStreak++;
    checkIndex--;
  }

  return currentStreak;
}

export async function fetchStats(username = 'jmtcabili'): Promise<GitHubStats | null> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  const token =
    (typeof import.meta !== 'undefined' && import.meta.env?.GITHUB_TOKEN) ||
    (typeof process !== 'undefined' ? process.env?.GITHUB_TOKEN : undefined);

  if (!token) {
    console.warn('⚠️ GITHUB_TOKEN is not configured in environment variables.');
    return null;
  }

  try {
    const yearsData = await graphql(token, CONTRIBUTION_YEARS_QUERY, { username });
    const years: number[] = yearsData?.user?.contributionsCollection?.contributionYears;
    if (!years) {
      throw new Error(`No user found for username "${username}".`);
    }

    const userData = (await graphql(token, buildStatsQuery(years), { username }))?.user;
    if (!userData) {
      throw new Error(`No user found for username "${username}".`);
    }

    // All-time figures: sum commits and join every year's days into one sorted timeline.
    let totalCommits = 0;
    const timeline: { date: string; contributionCount: number }[] = [];
    for (const year of years) {
      const collection = userData[`y${year}`];
      totalCommits += collection?.totalCommitContributions ?? 0;
      for (const week of collection?.contributionCalendar?.weeks ?? []) {
        timeline.push(...week.contributionDays);
      }
    }
    timeline.sort((a, b) => a.date.localeCompare(b.date));

    const calendarWeeks: ContributionWeek[] = userData.lastYear.contributionCalendar.weeks;
    const lastYearDays = calendarWeeks
      .flatMap((w) => w.contributionDays)
      .sort((a, b) => a.date.localeCompare(b.date));

    const stats: GitHubStats = {
      totalCommits,
      longestStreak: longestStreak(timeline),
      currentStreak: currentStreak(lastYearDays),
      followers: userData.followers?.totalCount ?? 0,
      following: userData.following?.totalCount ?? 0,
      lastYear: {
        totalContributions: userData.lastYear.contributionCalendar.totalContributions,
        weeks: calendarWeeks,
      },
    };

    memoryCache = { data: stats, timestamp: now };
    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error instanceof Error ? error.message : error);
    return null;
  }
}

// Alias for backwards compatibility
export const getGitHubStats = fetchStats;
