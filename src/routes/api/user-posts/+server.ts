import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const type = url.searchParams.get('type');
    const userId = url.searchParams.get('userId');
    let canRequestMore = true;
    
    const count = await locals.dbconn.query("SELECT COUNT(*) FROM posts");
    if(+limit! >= +count.rows[0].count){
        canRequestMore = false;
    }
    const likedPosts = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [userId]);
    const liked = likedPosts.rows.map((post) => post.post_id);

    if(type === 'liked'){
        const result = await locals.dbconn.query(`SELECT * FROM posts WHERE id IN (SELECT post_id FROM likes WHERE user_id = $1) LIMIT ${limit}`, [userId]);
        return json({ success: true, images: result.rows, canRequestMore: canRequestMore, likedPosts: liked});
    }else{
        const result = await locals.dbconn.query(`SELECT * FROM posts WHERE userId = $1 LIMIT ${limit}`, [userId]);
        return json({ success: true, images: result.rows, canRequestMore: canRequestMore, likedPosts: liked});
    }
    // const result = await locals.dbconn.query(`SELECT * FROM posts LIMIT ${limit}`);
    // return json({ success: true, images: result.rows, canRequestMore: canRequestMore});
}