import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
	cookies.delete('auth', {
		path: '/'
	});

	throw redirect(302, '/');
}
