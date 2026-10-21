import { getCollection, type CollectionEntry } from 'astro:content';
import { projectKinds } from '@/data/projectKinds';

export type Project = CollectionEntry<'projects'>;

export const projectUrl = (project: Project) => `/projects/${project.id}/`;

const kindIndex = (project: Project) => projectKinds.findIndex((kind) => kind.id === project.data.kind);

/** Every project, in page order: by kind as listed in projectKinds, then by `order`. */
export async function getProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');
	return projects.sort(
		(a, b) =>
			kindIndex(a) - kindIndex(b) ||
			a.data.order - b.data.order ||
			a.data.title.localeCompare(b.data.title),
	);
}

/** Projects grouped by kind. Kinds with no projects are left out, so their section and filter disappear. */
export function groupByKind(projects: Project[]) {
	return projectKinds
		.map((kind) => ({ ...kind, projects: projects.filter((project) => project.data.kind === kind.id) }))
		.filter((group) => group.projects.length > 0);
}
