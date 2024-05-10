import { error } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const checkUser = params.user;
    const result = await locals.dbconn.query("SELECT * FROM users WHERE username = $1", [checkUser]);
    if (!result.rows[0]) {
        throw error(404, {message: "User not found" });
    }

    const userId = result.rows[0].id;
    let isSubscribed = false;
    if(locals.user && locals.user.userId !== userId){
        const subResult = await locals.dbconn.query("SELECT * FROM subscribers WHERE subscriber_id = $1 AND author_id = $2", [locals.user.userId, userId]);
        if(subResult.rows[0]){
            isSubscribed = true;
        }
    }
    const subscribersCount = await locals.dbconn.query("SELECT COUNT(*) FROM subscribers WHERE author_id = $1", [userId]);
    return {
        userPage: {
            userId: result.rows[0].id,
            username: result.rows[0].username,
            email: result.rows[0].email,
            image: result.rows[0].image,
            subscribersCount: subscribersCount.rows[0].count
        },
        isSubscribed: isSubscribed,
        user: locals.user,
    };
}