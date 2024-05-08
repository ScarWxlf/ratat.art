<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import created from '$lib/images/created.jpg';
	import saved from '$lib/images/saved.jpg';
	import Layout from '$lib/components/Layout.svelte';

	export let data: PageData;
	let open: string;
	const imageName = data?.user?.userId;
	let src = `/uploads/profilePictures/${imageName}.jpg`;
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-center">
		<img class="h-36 w-36 rounded-full object-cover" {src} alt="profile" />
		<h1 class="text-5xl font-bold mt-2">{$page.params.user}</h1>
		<p class="mt-2">0 subscribers</p>
		{#if $page.params.user === data?.user?.username}
			<a href="/profile_settings"
				><button class="mt-2 bg-gray-300 py-2 px-4 rounded-3xl">Edit Profile</button></a
			>
		{:else}
			<button class="text-white mt-2 bg-red-500 py-2 px-4 rounded-3xl">Subscribe</button>
		{/if}
	</div>
	<div class="flex justify-center mt-2 gap-8">
		<button
			class="py-1 px-2 hover:bg-gray-300 rounded-lg"
			on:click={(e) => {
				open = 'created';
			}}
		>
			Created
		</button>
		<button
			class="py-1 px-2 hover:bg-gray-300 rounded-lg"
			on:click={(e) => {
				open = 'saved';
			}}
		>
			Saved
		</button>
	</div>
	<div class="flex w-10/12 mt-2">
		{#if open === 'created'}
			<img class="w-60 rounded-xl" src={created} alt="created" />
			<!-- <Layout a={0} b={3} /> -->
		{:else}
			<img class="w-60 rounded-xl" src={saved} alt="saved" />
			<!-- <Layout a={0} b={9} /> -->
		{/if}
	</div>
</div>
