import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const userId = locals.user ? locals.user.userId : null;
    let blacklistTags = [] as string[];
    if(locals.user){
        blacklistTags = locals.user.tags;
    }
    let liked = [];
    if(userId !== null){
        const likedPosts = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [userId]);
        // @ts-expect-error beb
        liked = likedPosts.rows.map((post) => post.post_id);
    }

    const result = await locals.dbconn.query(`SELECT * FROM posts WHERE NOT (tags && $1) LIMIT ${limit} OFFSET ${offset}`, [blacklistTags]);
    return json({ success: true, images: result.rows, likedPosts: liked});
}