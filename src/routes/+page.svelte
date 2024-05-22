<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	
	let limit = 10;
    let offset = 0;
    let likedPosts = [] as number[];
	async function getPosts(){
        const res = await fetch(`/api/get-posts?limit=${limit}&offset=${offset}`);
		const data = await res.json();
        offset += 10;
        likedPosts = data.likedPosts;
        return data.images.map((image: any) => ({ key: image.id, ...image }))
    }

</script>

<Layout likedPosts={likedPosts} getPosts={getPosts}/>