<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Layout from '$lib/components/Layout.svelte';
	import { handleSubscribe, handleUnSubscribe } from '$lib/components/subFunctions';

	export let data: PageData;
	let isSubscribed: boolean;
	isSubscribed = data?.isSubscribed;
	const user = data?.user;
	let userPage;
	$: userPage = data?.userPage;

	let postsType = 'liked';
	let limit = 2;

	const getUserPosts = async () => {
		const res = await fetch(
			`/api/user-posts?userId=${userPage.userId}&limit=${limit}&type=${postsType}`
		);
		const data = await res.json();
		limit += 2;
		return data;
	};
	let items = [];
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-center">
		<img class="h-36 w-36 rounded-full object-cover" src={userPage.image} alt="profile" />
		<h1 class="text-5xl font-bold mt-2">{userPage.username}</h1>
		<p class="mt-2 mb-1">{userPage.subscribersCount} subscribers</p>
		{#if userPage.username === data?.username}
			<a href="/profile_settings"
				><button class="mt-2 bg-gray-300 py-2 px-4 rounded-3xl">Edit Profile</button></a
			>
		{:else if data.auth && user.userId !== userPage.userId && !isSubscribed}
			<!-- <form method="POST" action="/api/subscribe">
				<button class="text-white mt-2 bg-green-500 py-2 px-4 rounded-3xl">Subscribe</button>
			</form> -->
			<button
				on:click={async () => {
					isSubscribed = await handleSubscribe(userPage.userId);
				}}
				class="text-white mt-2 bg-red-500 py-2 px-4 rounded-3xl">Subscribe</button
			>
		{:else if data.auth && user.userId !== userPage.userId}
			<button
				on:click={async () => {
					isSubscribed = await handleUnSubscribe(userPage.userId);
				}}
				class="mt-2 bg-gray-300 py-2 px-4 rounded-3xl">Unsubscribe</button
			>
		{/if}
	</div>
	<div class="flex justify-center mt-8 gap-4 mb-2">
		<div class="flex flex-col items-center">
			<button
				class="py-1 px-2 hover:bg-gray-300 rounded-lg"
				on:click={(e) => {
					postsType = 'created';
				}}
			>
				Created
			</button>
			<div class="h-0.5 mt-0.5 w-3/4 bg-black {postsType === 'created' ? '' : 'collapse'}" />
		</div>
		<div class="flex flex-col items-center">
			<button
				class="py-1 px-2 hover:bg-gray-300 rounded-lg"
				on:click={(e) => {
					postsType = 'liked';
				}}
			>
				Liked
			</button>
			<div class="h-0.5 mt-0.5 w-3/4 bg-black {postsType === 'liked' ? '' : 'collapse'}" />
		</div>
	</div>
	<div class="flex w-10/12 mt-2">
		{#key postsType}
			{#if postsType === 'created'}
				<!-- {#if items.length === 0}
					<div class="flex justify-center w-full">{userPage.username} hasn't no post yet, but there's tons of potential </div>
				{/if} -->
				<Layout bind:images={items} getPosts={getUserPosts} />
			{:else}
				<!-- {#if items.length === 0}
					<div class="flex justify-center w-full">{userPage.username} hasn't saved any posts yet</div>
				{/if} -->
				<Layout bind:images={items} getPosts={getUserPosts} />
			{/if}
		{/key}
	</div>
</div>
