// import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';

// export const GET: RequestHandler = async ({ request, locals }) => {
//     const url = new URL(request.url);
//     const limit = url.searchParams.get('limit');
//     if(!locals.postCout){
//         const result = await locals.dbconn.query("SELECT COUNT(*) FROM posts");
//         locals.postCout = result.rows[0].count;
//     }
//     if(limit! >= locals.postCout){
//         const result = await locals.dbconn.query(`SELECT * FROM posts`);
//         return json({ success: true, images: result.rows, canRequestMore: false});
//     }
//     const result = await locals.dbconn.query(`SELECT * FROM posts LIMIT ${limit}`);
//     return json({ success: true, images: result.rows, canRequestMore: false});
// }