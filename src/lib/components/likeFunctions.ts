export const handleLike = async (post_id: number) => {
    const res = await fetch('/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({post_id: post_id})
    });
    const data = await res.json();
    return data.success;
};