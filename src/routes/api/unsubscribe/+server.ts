import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    const subscriberUserId = locals.user.userId;
    const authorUserId = data.authorUserId;
    try {
        await locals.dbconn.query("DELETE FROM subscribers WHERE subscriber_id = $1 AND author_id = $2", [subscriberUserId, authorUserId]);
        return json({ success: true})
        
    } catch (err) {
        return error(500, { message: err.message });
    }
}