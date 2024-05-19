import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    const search = data.search;
    // WHERE NOT (tags && $1)
    let blacklistTags = [] as string[];
    if(locals.user){
        blacklistTags = locals.user.tags;
    }
    const userResult = await locals.dbconn.query("SELECT id, username, image FROM users WHERE username ILIKE $1", [`%${search}%`]);
    const tagsResult = await locals.dbconn.query("SELECT id, tags FROM posts WHERE (tags @> ARRAY[$1] OR array_to_string(tags, ' ') ILIKE $2) AND NOT (tags && $3)", [search, `%${search}%`, blacklistTags]);
    const titleAndDescriptionResult = await locals.dbconn.query("SELECT id, title, description FROM posts WHERE (title ILIKE $1 OR description ILIKE $1) AND NOT (tags && $2)", [`%${search}%`, blacklistTags]);
    const users = userResult.rows.map((user: { id: string, username: string, image: string }) => {
        return {
            type: 'user',
            id: user.id,
            username: user.username,
            image: user.image
        }
    });
    const uniqueTags = new Set();
    // @ts-expect-error beb
    tagsResult.rows.forEach((tag) => {
        // @ts-expect-error beb
        tag.tags.forEach((t) => {
           if(t.includes(search.toLowerCase())){
               uniqueTags.add(t)
           }
        })
    })
    const tags = Array.from(uniqueTags).map((tag) => {
        return {
            type: 'tag',
            tag: tag
        }
    })
    // @ts-expect-error beb
    const titleAndDescription = titleAndDescriptionResult.rows.map((post) => {
        return {
            type: 'name',
            title: post.title,
            id: post.id
        }
    })
    const searchResult = tags.concat(titleAndDescription).concat(users);
    return json({succes: true, searchResult: searchResult}) 
}