import { fail, redirect } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import { extname } from 'path';
import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad = ({ locals }) => {
	return{user: locals.user}
}

export const actions: Actions = {
	public_profile: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const username = data.get('username');
		// const SECRET_KEY = env.JWT_SECRET_KEY;
		const token = cookies.get('auth');
		if (!token) {
			return fail(401, {message: 'Unauthorized'});
		}
		try {
			const {userId} = locals.user;
            const result = await locals.dbconn.query("UPDATE users SET username = $1 WHERE id = $2 RETURNING username", [username, userId]);
			locals.user.username = result.rows[0].username;
			return {successUsername: true}
		} catch (error) {
			cookies.delete('auth', {
				path: '/'
			});
            throw redirect(302, '/');
		}
	},
	public_profile_picture: async ({ request, locals }) => {
		const data = await request.formData();
		const picture = data.get('picture');
		const filename = `static/uploads/profilePictures/${locals.user.userId}${extname(picture?.name)}`;
    	await writeFile(filename, Buffer.from(await picture?.arrayBuffer()));
		const filenameDB = `/uploads/profilePictures/${locals.user.userId}${extname(picture?.name)}`
		await locals.dbconn.query('UPDATE users SET image = $1 WHERE id = $2', [filenameDB, locals.user.userId]);

		return { success: true };
	}
};
