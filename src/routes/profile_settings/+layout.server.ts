import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {
	if (!cookies.get('auth')) {
		throw redirect(302, '/');
	}
}