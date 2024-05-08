import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies, locals }) {
	const SECRET_KEY = env.JWT_SECRET_KEY;
	const token = cookies.get('auth');
	if(!token) {
		return {
			auth: false
		};
	}
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		return {
			auth: true,
			username: locals.user.username,
		};
	} catch (error) {
		cookies.delete('auth', {
			path: '/'
		});
		return {
			auth: false
		};
	}
}
