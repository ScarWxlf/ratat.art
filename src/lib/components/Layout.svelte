<script lang="ts">
	import LikeButton from '$lib/components/Like-Button.svelte';
	import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
	import { onMount } from 'svelte';
    export let getPosts;

	let images = [] as { key: number; id: number; image: string }[]
	export let likedPosts = [] as number[];
	let canRequestMore = true;
	onMount(async () => {
		images = await getPosts();
	});

	let innerWidth = 0;
	let innerHeight = 0;
	$: column = Math.floor(innerWidth / 236);
	$: isMobile = innerWidth > 0 && innerWidth < 600;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svelte:head>
	<title>ratat.art</title>
	<meta name="description" content="ratat.art" />
</svelte:head>
<div class="w-full flex justify-center">
	<div class="container">
		<MasonryInfiniteGrid
			class="w-full"
			columnCalculationThreshold={2}
			align="center"
			column={isMobile ? 2 : column - 1}
			gap={isMobile ? 8 : 16}
			items={images}
			on:requestAppend={async ({ detail: e }) => {
				if (!canRequestMore) return;
				e.wait();
				setTimeout(async () => {
					const newImages = await getPosts();
					if(newImages.length === 0) canRequestMore = false;
					images = [...images, ...newImages];
					e.ready();
				}, 1000);
			}}
			let:visibleItems
		>
			{#each visibleItems as item (item.key)}
				<div class="group" style={isMobile ? `width: ${innerWidth / 2 - 12}px;` : 'width: 236px;'}>
					<a href="/post/{item.data.id}">
					<div
						class="absolute text-white transition-all duration-200 invisible opacity-0 group-hover:visible group-hover:opacity-100 flex justify-end flex-col w-full h-full"
					>
						<div class="w-full h-full bg-opacity-20 bg-black p-2 rounded-2xl">
							<div class="flex flex-row gap-2 text-2xl mt-1 me-1">
								<div class="flex-grow" />
								<LikeButton isLiked={likedPosts.includes(item.data.id)} postId={item.data.id} />
							</div>
						</div>
					</div>
					<img class="w-full rounded-2xl" src={item.data.image} alt="egjs" />
					</a>
				</div>
			{/each}
		</MasonryInfiniteGrid>
	</div>
</div>
