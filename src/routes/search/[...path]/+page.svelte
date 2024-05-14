<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
	import {page} from '$app/stores';

    export let data;
    const user = data?.user;


	let images = [];
    let limit = 2;
    let offset = 0;
    let likedPosts = [] as number[];
	async function getTagsPosts(){
        const res = await fetch(`/api/tag?tag=${$page.params.path}&limit=${limit}&offset=${offset}`);
		const data = await res.json();
        offset += 2;
        likedPosts = data.likedPosts;
        return data.images.map((image: object) => ({ key: image.id, ...image }))
    }

</script>

<Layout likedPosts={likedPosts} getPosts={getTagsPosts}/>
