// Kinds group the /projects/ gallery. The id doubles as the section anchor and filter URL (/projects/#ai-data).
// Order here is the order the sections appear on the page.
export const projectKinds = [
	{ id: 'ai-data', label: 'AI & data' },
	{ id: 'products', label: 'Products & tools' },
	{ id: 'websites', label: 'Websites' },
	{ id: 'research', label: 'Research' },
] as const;

export type ProjectKind = (typeof projectKinds)[number]['id'];

export const projectKindIds = projectKinds.map((kind) => kind.id) as [ProjectKind, ...ProjectKind[]];
