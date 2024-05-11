<script lang="ts">
	import src from '$lib/images/saved.jpg';
	import LikeButton from '$lib/components/Like-Button.svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { handleSubscribe, handleUnSubscribe } from '$lib/components/subFunctions';
	import { comment } from 'postcss';

	export let data: PageData;
	const user = data?.user;
	const postOwner = data?.postOwner;
	const postDB = data?.post;
	const currentUserImage = user?.image;
	const postUserImage = postOwner?.image;
	const isLiked = data?.isLiked;
	const comments = data?.comments;
	let commentsOwners = data?.commentsOwners;
	let isSubscribed: boolean;
	isSubscribed = data?.isSubscribed;
	let commentButtonDisabled = true;

	const post = {
		postId: 0,
		title: 'Post Title',
		description:
			'Post Description Here lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.',
		image: src,
		owner: {
			image: '/uploads/profilePictures/3.jpg',
			username: 'ScarWxlf',
			subs: 0
		},
		tags: ['#cat', '#orange']
	};
	// let imageHeight;
	// if (typeof window !== 'undefined') {
	// 	let imageStyle = window.getComputedStyle(document.getElementById('image')!);
	// 	imageHeight = imageStyle.height;
	// }

	// /** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
	// async function handleSubmit(event){
	// 	const request = new FormData(event.target);
	// 	const response = await fetch(event.currentTarget.action, {
	// 		method: 'POST',
	// 		body: data
	// 	});

	// 	/** @type {import('@sveltejs/kit').ActionResult} */
	// 	const result = deserialize(await response.text());

	// 	if (result.type === 'success') {
	// 		await invalidateAll();
	// 	}

	// 	applyAction(result);
	// }
</script>

<div class="flex w-full justify-center mt-1 mb-10">
	<div class="flex w-8/12 bg-gray-200 rounded-2xl shadow-2xl">
		<div class="flex h-full items-center w-6/12">
			<img
				class=" rounded-tl-2xl rounded-bl-2xl object-cover"
				id="image"
				src={postDB.image}
				alt="post"
			/>
		</div>
		<div class="w-6/12 relative">
			<div class="flex flex-col">
				<div class="flex justify-between items-center py-3 h-24 px-10">
					<a href={postDB.image} target="_blank">
						<button
							class="flex items-center gap-2 text-white mt-2 bg-gray-400 py-2 px-4 rounded-3xl"
							>View image<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-box-arrow-up-right"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
								/>
								<path
									fill-rule="evenodd"
									d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
								/>
							</svg></button
						>
					</a>
					<LikeButton {isLiked} postId={postDB.id} />
				</div>
				<div class="overflow-x-auto min-h-[350px] max-h-[585px]">
					<div class="px-7">
						<h1 class="text-3xl">{postDB.title}</h1>
						<ul class="flex gap-2 mt-2">
							{#each postDB.tags as tag}
								<li>#{tag}</li>
							{/each}
						</ul>
						<p class="text-xl mt-2">{postDB.description}</p>
					</div>
					<div class="flex w-full h-32 items-center justify-between px-7">
						<a href="/user/{postOwner.username}">
							<div class="flex">
								<img
									class="h-14 w-14 rounded-full object-cover"
									src={postUserImage}
									alt="profile"
								/>
								<div class="px-2">
									<p class="text-xl">{postOwner.username}</p>
									<p class="text-sm">{postOwner.subscribersCount} subscribers</p>
								</div>
							</div>
						</a>
						<div>
							{#if data.auth && user.userId !== postOwner.userId && !isSubscribed}
								<!-- <form method="POST" action="/api/subscribe">
								<button class="text-white mt-2 bg-green-500 py-2 px-4 rounded-3xl">Subscribe</button>
							</form> -->
								<button
									on:click={async () => {
										isSubscribed = await handleSubscribe(postOwner.userId);
									}}
									class="text-white mt-2 bg-red-500 py-2 px-4 rounded-3xl">Subscribe</button
								>
							{:else if data.auth && user.userId !== postOwner.userId}
								<button
									on:click={async () => {
										isSubscribed = await handleUnSubscribe(postOwner.userId);
									}}
									class="mt-2 bg-gray-300 py-2 px-4 rounded-3xl">Unsubscribe</button
								>
							{/if}
						</div>
					</div>
					<div class="flex flex-col px-7">
						<p class="text-xl">Comments</p>
						{#if comments.length === 0}
							<p class="w-full mt-1">No comments yet! Add one to start the conversation.</p>
						{:else}
							<ul class="flex flex-col mt-5">
								{#each comments as coment}
									<li class="flex gap-2 py-2">
										<img
											class="h-10 w-10 rounded-full object-cover"
											src={commentsOwners.find((owner) => owner.id === coment.user_id).image}
											alt="profile"
										/>
										<div class="flex flex-col break-all">
											<p>
												<span class="font-medium"
													>{commentsOwners.find((owner) => owner.id === coment.user_id)
														.username}</span
												>
												{coment.content}
											</p>
											<p class="text-gray-500 text-sm">
												{coment.created_date}
											</p>
										</div>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
				<div
					class="flex items-center bottom-0 rounded-br-2xl w-full px-4 gap-2 border-t h-20 border-gray-400 bg-gray-200"
				>
					<div class="flex w-full gap-2">
						{#if data.auth}
							<img
								class="h-16 w-16 rounded-full object-cover"
								src={currentUserImage}
								alt="profile"
							/>
							<form class="flex w-full items-center gap-2" method="POST" action="?/comment">
								<input
									class="rounded-full w-full bg-violet-100 text-xl border border-gray-500 p-4 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
									placeholder="Enter comment"
									name="comment"
									on:input={(event) => {
										commentButtonDisabled = event.currentTarget.value.length === 0;
									}}
								/>
								<button
									class="bg-red-500 rounded-full p-3 text-2xl disabled:bg-gray-400 disabled:cursor-not-allowed"
									type="submit"
									disabled={commentButtonDisabled}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										fill="currentColor"
										class="bi bi-send"
										viewBox="0 0 16 16"
									>
										<path
											d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
										/>
									</svg>
								</button>
							</form>
						{:else}
							<div class="flex w-full justify-center">
								<a href="/sign-in">
									<button class="bg-green-500 rounded-3xl py-2 px-4 text-2xl"
										>Login to comment</button
									>
								</a>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
