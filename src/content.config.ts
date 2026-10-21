import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { projectKindIds } from '@/data/projectKinds';

// One Markdown file per project: the frontmatter feeds the gallery card, the body is the write-up.
const projects = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				// One sentence: what it is and, where the résumé backs it, the result.
				summary: z.string(),
				kind: z.enum(projectKindIds),
				// Lowest number leads its kind. The lead of the first kind is the accent card.
				order: z.number().int(),
				role: z.string(),
				org: z.string(),
				dates: z.string(),
				stack: z.array(z.string()).max(4).default([]),
				// Screenshot in src/assets/projects/. Optional: cards without one show the summary in the frame.
				cover: image().optional(),
				coverAlt: z.string().optional(),
				links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
			})
			.refine((data) => !data.cover || data.coverAlt, {
				message: 'A cover needs coverAlt that describes the screenshot.',
				path: ['coverAlt'],
			}),
});

export const collections = { projects };
