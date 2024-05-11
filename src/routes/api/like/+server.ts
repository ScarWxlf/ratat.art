import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    const user_id = locals.user.userId;
    const post_id = data.post_id;
    const like = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1 AND post_id = $2", [user_id, post_id]);
    if(like.rows.length === 0){
        try {
            await locals.dbconn.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [user_id, post_id]);
            return json({ success: true})
            
        } catch (err) {
            return error(500, { message: err.message });
        }
    }else{
        try {
            await locals.dbconn.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [user_id, post_id]);
            return json({ success: true})
            
        } catch (err) {
            return error(500, { message: err.message });
        }
    }
}