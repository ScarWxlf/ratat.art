import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import { extname } from 'path';

export const load: PageServerLoad = ({ cookies }) => {
	if (!cookies.get('auth')) {
		throw redirect(302, '/sign-in');
	}
};

export const actions: Actions = {
	'create-post': async ({ request, locals }) => {
		const data = await request.formData();
		const picture = data.get('postPicture');
		const title = data.get('title');
		const decsription = data.get('description');
		const stringTags = data.get('hiddenTags') as string;
		const userId = locals.user.userId;
		
		let tags = stringTags.split(',');
		if(stringTags === '')
			tags = [];

		if(picture.size === 0)
		{
			return fail(400, {imageMessage: 'image is requred'})
		}
		if(title === ''){
			return fail(400, {titleMessage: 'title is requred'})
		}
		try {
			const result = await locals.dbconn.query('SELECT id FROM posts ORDER BY id DESC LIMIT 1');
			let postId;
			if (!result.rows[0]) {
				postId = 1;
			} else {
				postId = result.rows[0].id + 1;
			}
			const filenameDB = `/uploads/postPictures/${postId}${extname(picture?.name)}`;
			const filename = `static/uploads/postPictures/${postId}${extname(picture?.name)}`;
			await writeFile(filename, Buffer.from(await picture?.arrayBuffer()));
			await locals.dbconn.query(
				'INSERT INTO posts(userId, title, description, image, tags) VALUES($1, $2, $3, $4, $5)',
				[userId, title, decsription, filenameDB, tags]
			);

			return { success: true };
		} catch (error) {
			console.log(error);
		}
	}
};
