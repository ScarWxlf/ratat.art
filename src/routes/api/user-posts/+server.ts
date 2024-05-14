import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const type = url.searchParams.get('type');
    const userId = url.searchParams.get('userId');
    const offset = url.searchParams.get('offset');

    let liked = [];
    if(locals.user){
        const likedPosts = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [locals.user.userId]);
        liked = likedPosts.rows.map((post) => post.post_id);
    }

    if(type === 'liked'){

        const result = await locals.dbconn.query(`SELECT * FROM posts WHERE id IN (SELECT post_id FROM likes WHERE user_id = $1) LIMIT ${limit} OFFSET ${offset}`, [userId]);
        return json({ success: true, images: result.rows, likedPosts: liked});
    }else{
        const result = await locals.dbconn.query(`SELECT * FROM posts WHERE userId = $1 LIMIT ${limit} OFFSET ${offset}`, [userId]);

        return json({ success: true, images: result.rows,  likedPosts: liked});
    }
    // const result = await locals.dbconn.query(`SELECT * FROM posts LIMIT ${limit}`);
    // return json({ success: true, images: result.rows, canRequestMore: canRequestMore});
}