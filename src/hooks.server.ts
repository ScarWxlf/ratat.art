import jwt, { type JwtPayload } from 'jsonwebtoken';
import { connectToDB } from '$lib/db';
import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const dbconn = await connectToDB();
	event.locals.dbconn = dbconn; 

	const token = event.cookies.get('auth');

	if (token) {
		try {
			const SECRET_KEY = env.JWT_SECRET_KEY;
			const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
            const result = await dbconn.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
            event.locals.user = {
                userId: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email,
				image: result.rows[0].image,
				tags: result.rows[0].tags
            }

		} catch (err) {
			console.error('Error decoding token:', err);
		}
	}

	const response = await resolve(event);
	dbconn.release();

	return response;
};
