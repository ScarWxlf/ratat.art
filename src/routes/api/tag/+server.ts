import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const userId = url.searchParams.get('userId');
    const limit = url.searchParams.get('limit');
    const tagsResult = await locals.dbconn.query("SELECT * FROM posts WHERE tags @> ARRAY[$1] OR array_to_string(tags, ' ') ILIKE $2", [tag, `%${tag}%`]);
    let canRequestMore = true;
    
    const count = await locals.dbconn.query("SELECT COUNT(*) FROM posts");
    if(+limit! >= +count.rows[0].count){
        canRequestMore = false;
    }
    const likedPosts = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [userId]);
    const liked = likedPosts.rows.map((post) => post.post_id);

    return json({ success: true, images:tagsResult.rows, canRequestMore: canRequestMore, likedPosts: liked});
}