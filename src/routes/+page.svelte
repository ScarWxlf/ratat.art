<!-- <script lang='ts'>
	import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
	import type {PageData} from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let images = [];
	let limit = 10;
	let offset = 0;
	let canRequestMore = true;
	onMount(async () => {
		images = getItems(0, limit);
	});

	async function getItems(nextGroupKey: number, count: number) {
		const nextItems = [];

		const result = await fetch(`/api/get-posts?limit=${limit}&offset=${nextGroupKey}`);
		const responseData = await result.json();
		images = responseData.images;
		limit +=10;

		for (let i = 0; i < count; ++i) {
			const nextKey = nextGroupKey * count + i;
			nextItems.push({ groupKey: nextGroupKey, key: nextKey, url:images[i].image, title: images[i].title });
		}
		return nextItems;
	}

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
				const nextGroupKey = (+e.groupKey || 0) + 1;
				const result = await getItems(nextGroupKey, 10)
				images = [...result];
			}}
			let:visibleItems
		>
			{#each visibleItems as item (item.key)}
				<div class="group" style={isMobile ? `width: ${innerWidth / 2 - 12}px;` : 'width: 236px;'}>
					<div
						class="absolute text-white transition-all duration-200 invisible opacity-0 group-hover:visible group-hover:opacity-100 flex justify-end flex-col w-full h-full"
					>
						<div class="w-full bg-opacity-50 bg-black p-2 rounded-b-2xl">
							<h2>{item.data.title}</h2>
							<div class="flex flex-row gap-2 text-2xl">
								<div class="flex-grow" />
								<button>❤️</button>
								<button>✅</button>
							</div>
						</div>
					</div>
					<img class="w-full rounded-2xl" src={item.data.url} alt="egjs" />
				</div>
			{/each}
		</MasonryInfiniteGrid>
	</div>
</div> -->

<script lang='ts'>
	import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
	import type {PageData} from './$types';

	export let data: PageData;
	let items = getItems(0, 10);

	function getItems(nextGroupKey: number, count: number) {
		const nextItems = [];

		for (let i = 0; i < count; ++i) {
			const nextKey = nextGroupKey * count + i;

			let w = Math.floor(Math.random() * 500) + 236;
			let h = Math.floor(Math.random() * 500) + 300;
			var randomColor = Math.floor(Math.random() * 16777215).toString(16);
			let text = nextKey;
			// let url = `https://dummyimage.com/${w}x${h}/${randomColor}/fff`;
			let url = `https://picsum.photos/${w}/${h}`;

			nextItems.push({ groupKey: nextGroupKey, key: nextKey, url, title: text });
		}
		return nextItems;
	}
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
			{items}
			on:requestAppend={({ detail: e }) => {
				const nextGroupKey = (+e.groupKey || 0) + 1;

				items = [...items, ...getItems(nextGroupKey, 10)];
			}}
			let:visibleItems
		>
			{#each visibleItems as item (item.key)}
				<div class="group" style={isMobile ? `width: ${innerWidth / 2 - 12}px;` : 'width: 236px;'}>
					<div
						class="absolute text-white transition-all duration-200 invisible opacity-0 group-hover:visible group-hover:opacity-100 flex justify-end flex-col w-full h-full"
					>
						<div class="w-full bg-opacity-50 bg-black p-2 rounded-b-2xl">
							<h2>{item.data.title}</h2>
							<div class="flex flex-row gap-2 text-2xl">
								<div class="flex-grow" />
								<button>❤️</button>
								<button>✅</button>
							</div>
						</div>
					</div>
					<img class="w-full rounded-2xl" src={item.data.url} alt="egjs" />
				</div>
			{/each}
		</MasonryInfiniteGrid>
	</div>
</div>
