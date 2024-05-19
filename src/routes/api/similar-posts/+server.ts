import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const tags = url.searchParams.get('tags');
    const postId = url.searchParams.get('postId');
    const userId = locals.user ? locals.user.userId : null;
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    let liked = [];
    if(userId !== null){
        const likedPosts = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [userId]);
        // @ts-expect-error beb
        liked = likedPosts.rows.map((post) => post.post_id);
    }
    
    const requestTags = tags!.split(',');
    const tagsResult = await locals.dbconn.query("SELECT * FROM posts WHERE tags && $1 AND id != $4 LIMIT $2 OFFSET $3", [requestTags, limit, offset, postId]);
    return json({ success: true, images:tagsResult.rows, likedPosts: liked});
}