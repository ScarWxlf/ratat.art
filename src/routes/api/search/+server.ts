import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    const search = data.search;
    const userResult = await locals.dbconn.query("SELECT id, username, image FROM users WHERE username ILIKE $1", [`%${search}%`]);
    const tagsResult = await locals.dbconn.query("SELECT id, tags FROM posts WHERE tags @> ARRAY[$1] OR array_to_string(tags, ' ') ILIKE $2", [search, `%${search}%`]);
    const titleAndDescriptionResult = await locals.dbconn.query("SELECT id, title, description FROM posts WHERE title ILIKE $1 OR description ILIKE $1", [`%${search}%`]);
    const users = userResult.rows.map((user) => {
        return {
            type: 'user',
            id: user.id,
            username: user.username,
            image: user.image
        }
    });
    const uniqueTags = new Set();
    tagsResult.rows.forEach((tag) => {
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