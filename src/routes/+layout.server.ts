import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const SECRET_KEY = env.JWT_SECRET_KEY;
	const token = cookies.get('auth');
	if(!token) {
		return {
			auth: false
		};
	}
	try {
		jwt.verify(token, SECRET_KEY);
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
