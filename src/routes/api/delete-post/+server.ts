import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { unlink } from 'fs/promises';

export const DELETE: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    try {
        await locals.dbconn.query("DELETE FROM likes WHERE post_id = $1", [id]);
        await locals.dbconn.query("DELETE FROM comments WHERE post_id = $1", [id]);
        const res = await locals.dbconn.query("DELETE FROM posts WHERE id = $1 RETURNING image", [id]);
        const path = 'static' + res.rows[0].image;
        await unlink(path);
        return json({ success: true });
    } catch (error) {
        console.log(error)
        return json({ success: false });
    }
}