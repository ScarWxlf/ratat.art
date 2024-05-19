import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const userId = locals.user ? locals.user.userId : null;
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    let blacklistTags = [] as string[];
    if(locals.user){
        blacklistTags = locals.user.tags;
    }

    let liked = [];
    if(userId !== null){
        const likedPosts = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [userId]);
        liked = likedPosts.rows.map((post) => post.post_id);
    }
    
    const tagsResult = await locals.dbconn.query("SELECT * FROM posts WHERE (tags @> ARRAY[$1] OR array_to_string(tags, ' ') ILIKE $2) AND NOT (tags && $5) LIMIT $3 OFFSET $4", [tag, `%${tag}%`, limit, offset, blacklistTags]);
    return json({ success: true, images:tagsResult.rows, likedPosts: liked});
}