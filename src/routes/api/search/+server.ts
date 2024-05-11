import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    const search = data.search;
    const userResult = await locals.dbconn.query("SELECT id, username, email, image FROM users WHERE username ILIKE $1", [`%${search}%`]);
    const tagsResult = await locals.dbconn.query("SELECT id, tags FROM posts WHERE tags @> ARRAY[$1] OR array_to_string(tags, ' ') ILIKE $2", [search, `%${search}%`]);
    const titleAndDescriptionResult = await locals.dbconn.query("SELECT id, title, description FROM posts WHERE title ILIKE $1 OR description ILIKE $1", [`%${search}%`]);
    const users = userResult.rows.map((user) => {
        return {
            type: 'user',
            id: user.id,
            username: user.username,
            email: user.email,
            image: user.image
        }
    });
    // const uniqueTags = new Set();
    // tagsResult.rows.forEach((tag) => {
    //     tag.tags.forEach((t) => {
    //         uniqueTags.add(t);
    //     })
    // })
    const tags = tagsResult.rows.map((tag) => {
        return {
            type: 'tag',
            id: tag.id,
            tags: tag.tags
        }
    })
    console.log(tags)
    const titleAndDescription = titleAndDescriptionResult.rows.map((post) => {
        return {
            type: 'name',
            id: post.id,
            title: post.title,
            description: post.description
        }
    })
    const searchResult = tags.concat(titleAndDescription).concat(users);
    return json({succes: true, searchResult: searchResult}) 
}