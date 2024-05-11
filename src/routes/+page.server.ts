import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    let likedPosts = [];
    if(locals.user){
        const result = await locals.dbconn.query("SELECT * FROM likes WHERE user_id = $1", [locals.user.userId]);
        likedPosts = result.rows.map((post) => post.post_id);
    }
    
    return{
        likedPosts: likedPosts,
    }
}