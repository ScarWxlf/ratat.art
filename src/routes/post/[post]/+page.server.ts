import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const post = params.post;
    const result = await locals.dbconn.query("SELECT * FROM posts WHERE id = $1", [post]);
    if (!result.rows[0]) {
        throw error(404, { message: "Post not found" });
    }
    const userId = result.rows[0].userid;
    const userResult = await locals.dbconn.query("SELECT * FROM users WHERE id = $1", [userId]);
    return {
        postOwner: {
            userId: userResult.rows[0].id,
            username: userResult.rows[0].username,
        },
        user: locals.user,
        post: result.rows[0]
    }
};