import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const post = params.post;
    const result = await locals.dbconn.query("SELECT * FROM posts WHERE id = $1", [post]);
    if (!result.rows[0]) {
        throw error(404, { message: "Post not found" });
    }
    const userId = result.rows[0].userid;
    const userResult = await locals.dbconn.query("SELECT * FROM users WHERE id = $1", [userId]);
    
    let isSubscribed = false;
    if(locals.user && locals.user.userId !== userId){
        const subResult = await locals.dbconn.query("SELECT * FROM subscribers WHERE subscriber_id = $1 AND author_id = $2", [locals.user.userId, userId]);
        if(subResult.rows[0]){
            isSubscribed = true;
        }
    }
    const subscribersCount = await locals.dbconn.query("SELECT COUNT(*) FROM subscribers WHERE author_id = $1", [userId]);

    let isLiked = false;
    if(locals.user){
        const isLikeResult = await locals.dbconn.query("SELECT * FROM likes WHERE post_id = $1 AND user_id = $2", [post, locals.user.userId]);
        isLiked = isLikeResult.rows[0] ? true : false;
    }

    const commentsResult = await locals.dbconn.query("SELECT * FROM comments WHERE post_id = $1 ORDER BY user_id", [post]);
    const userIds = commentsResult.rows.map((comment) => comment.user_id);
    const commentsOwners = await locals.dbconn.query("SELECT username, id, image FROM users WHERE id = ANY($1) ORDER BY id", [userIds]);
    return {
        postOwner: {
            userId: userResult.rows[0].id,
            username: userResult.rows[0].username,
            subscribersCount: subscribersCount.rows[0].count,
            image: userResult.rows[0].image
        },
        user: locals.user,
        post: result.rows[0],
        isSubscribed: isSubscribed,
        isLiked: isLiked,
        comments: commentsResult.rows,
        commentsOwners: commentsOwners.rows
    }
};

export const actions: Actions ={
    comment: async ({ request, locals, params}) => {
        const data = await request.formData();
        const comment = data.get('comment');
        const newDate = new Date();
        const commentDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        const postId = params.post;
        const userId = locals.user.userId;
        try {
            await locals.dbconn.query('INSERT INTO comments(user_id, post_id, content, created_date) VALUES($1, $2, $3, $4)', [userId, postId, comment, commentDate]);
            return { success: true };
        } catch (error) {
            console.log(error);
            return fail(500, {message: "Failed to add comment"});
        }
    }
}