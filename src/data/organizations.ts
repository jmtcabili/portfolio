export interface Organization {
	name: string;
	url: string;
	// Path under public/, e.g. '/orgs/gdgoc-dlsu.svg'. Leave undefined until the icon is downloaded.
	icon?: string;
}

export const organizations: Organization[] = [
	{ name: 'GDGoC DLSU', url: 'https://github.com/GDGoC-DLSU', icon: "/orgs/gdgdoc.avif" },
	{ name: 'The LaSallian', url: 'https://github.com/thelasallian', icon: "/orgs/tls.avif"},
	{ name: 'Green & White', url: 'https://github.com/green-and-white', icon: "/orgs/green-and-white.avif" },
];
