import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	const tags = locals.user.tags;
	return {
		user: locals.user,
		tags: tags
	};
};

export const actions: Actions = {
	filters_profile: async ({ request, locals }) => {
		const data = await request.formData();
		const tag = data.get('tag');
		const userId = locals.user.userId;
		const res = await locals.dbconn.query('UPDATE users SET tags = array_append(tags, $1) WHERE id = $2 RETURNING tags', [
			tag,
			userId
		]);
		return { success: true, tags: res.rows[0].tags };
	},
	delete_tag: async ({ request, locals }) => {
		const data = await request.formData();
		const tag = data.get('tag');
		const userId = locals.user.userId;
		const res = await locals.dbconn.query('UPDATE users SET tags = array_remove(tags, $1) WHERE id = $2 RETURNING tags', [
			tag,
			userId
		]);
		return { success: true, tags: res.rows[0].tags};
	}
};
