import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
    const data = await request.json();
    const subscribeDate = new Date();
    const subscriberUserId = locals.user.userId;
    const authorUserId = data.authorUserId;
    try {
        await locals.dbconn.query("INSERT INTO subscribers (subscribe_date, subscriber_id, author_id) VALUES ($1, $2, $3)", [subscribeDate, subscriberUserId, authorUserId]);
        return json({ success: true})
        
    } catch (err) {
        return error(500, { message: err.message });
    }
}