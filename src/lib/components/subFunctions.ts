import { invalidateAll } from "$app/navigation";

export const handleSubscribe = async (author_id: number) => {
    const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authorUserId: author_id })
    });
    //const data = await res.json();
    invalidateAll();
    return true;
};

export const handleUnSubscribe = async (author_id: number)=>{
    const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authorUserId: author_id })
    });
    //const data = await res.json();
    invalidateAll();
    //че за ????
    return false;
}