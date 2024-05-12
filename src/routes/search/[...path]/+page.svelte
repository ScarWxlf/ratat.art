<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
	import {page} from '$app/stores';

    export let data;
    const user = data?.user;


    let posts = [];
    let limit = 2;
	async function getTagsPosts(){
        const res = await fetch(`/api/tag?tag=${$page.params.path}&limit=${limit}&userId=${user.userId}`);
		const data = await res.json();
        limit += 2;
        return data;
    }

</script>

<Layout getPosts={getTagsPosts}/>
