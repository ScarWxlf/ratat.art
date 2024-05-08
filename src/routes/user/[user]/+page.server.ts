import { error } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const checkUser = params.user;
    const result = await locals.dbconn.query("SELECT * FROM users WHERE username = $1", [checkUser]);
    if (!result.rows[0]) {
        throw error(404, {message: "User not found" });
    }
    return {
        user: {
            userId: result.rows[0].id,
            username: result.rows[0].username,
            email: result.rows[0].email,
        }
    };
}