import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
	cookies.delete('auth', {
		path: '/'
	});

	console.log(cookies.getAll());

	throw redirect(302, '/');
}
