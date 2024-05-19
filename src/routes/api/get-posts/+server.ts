import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    let canRequestMore = true;
    const count = await locals.dbconn.query("SELECT COUNT(*) FROM posts");
    let blacklistTags = [];
    if(locals.user){
        blacklistTags = locals.user.tags;
    }
    if(+limit! >= +count.rows[0].count){
        canRequestMore = false; 
    }
    // if(limit! >= locals.postCout){
    //     console.log('aaaa')
    //     const result = await locals.dbconn.query(`SELECT * FROM posts`);
    //     return json({ success: true, images: result.rows, canRequestMore: false});
    // }
    // const tagsResult = await locals.dbconn.query("SELECT * FROM posts WHERE NOT (tags && $1)", [someTags]);
    const result = await locals.dbconn.query(`SELECT * FROM posts WHERE NOT (tags && $1) LIMIT ${limit}`, [blacklistTags]);
    return json({ success: true, images: result.rows, canRequestMore: canRequestMore});
}