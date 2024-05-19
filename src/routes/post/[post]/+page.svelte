<script lang="ts">
	import LikeButton from '$lib/components/Like-Button.svelte';
	import type { PageData } from './$types';
	import { handleSubscribe, handleUnSubscribe } from '$lib/components/subFunctions';
	import { onMount } from 'svelte';
	import { goto} from '$app/navigation';
	import Layout from '$lib/components/Layout.svelte';

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

	let visDrop = false;
	let maxHeigh = 330;

	const handleClickOutside = (event: any) => {
		const dropdown = document.getElementById('dropdown');
		if (dropdown && !dropdown.contains(event.target)) {
			visDrop = false;
		}
	};

	onMount(() => {
		// @ts-expect-error beb
		maxHeigh = document.getElementById('image').offsetHeight;
		let commentsHeight = document.getElementById('comments') as HTMLElement;
		let height = commentsHeight.offsetHeight;
		if(height > maxHeigh)
		{
			commentsHeight.style.height = `${maxHeigh}px`;
		}

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	let showModal = false;
	let limit = 5;
    let offset = 0;
    let likedPosts = [] as number[];
	async function getSimilarPosts(){
        const res = await fetch(`/api/similar-posts?tags=${postDB.tags}&limit=${limit}&offset=${offset}&postId=${postDB.id}`);
		const data = await res.json();
        offset += 5;
        likedPosts = data.likedPosts;
        return data.images.map((image: any) => ({ key: image.id, ...image }))
    }
</script>

<div class="flex flex-col w-full items-center mt-1 mb-1">
	<div class="flex w-8/12 rounded-2xl shadow-gray-500 shadow-xl">
		<div class="flex h-full items-center w-6/12">
			<img
				class=" rounded-tl-2xl rounded-bl-2xl w-full object-cover"
				id="image"
				src={postDB.image}
				alt="post"
			/>
		</div>
		<div class="flex flex-col h-full w-6/12 relative">
			 <!-- h-full mb ne nado  -->
			
				<div class="flex justify-between items-center py-3 h-24 px-7">
					<div class="flex items-center gap-4">
						<div class="flex justify-center relative">
							<button
								class="flex items-centergap-2 mt-2 p-2 rounded-full {visDrop
									? 'bg-gray-400'
									: 'hover:bg-gray-300'}"
								id="dropdown"
								on:click={() => {
									visDrop = !visDrop;
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									fill="#000000"
									height="32px"
									width="32px"
									version="1.1"
									id="Capa_1"
									viewBox="0 0 32.055 32.055"
									xml:space="preserve"
								>
									<g>
										<path
											d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
										/>
									</g>
								</svg>
							</button>
							<div
								class="absolute top-16 bg-white rounded-md shadow-2xl ring-1 ring-gray-200 {visDrop ? '' : 'hidden'}"
							>
								<ul class="">
									{#if data.auth && user.userId === postOwner.userId}
										<li>
											<button
												class="w-full px-4 py-2 rounded-md dark:text-black hover:bg-gray-300"
												on:click={() => {
													showModal = true;
												}}
											>
												Delete
											</button>
										</li>
									{/if}
									<li class="px-4 py-2 rounded-md hover:bg-gray-300 dark:text-black">
										<a href={postDB.image} download>Download</a>
									</li>
								</ul>
							</div>
						</div>
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
						<div
							class="relative z-10"
							aria-labelledby="modal-title"
							role="dialog"
							aria-modal="true"
						>
							{#if showModal}
								<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
								<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
									<div
										class="flex items-end justify-center p-4 text-center sm:items-center sm:p-0"
									>
										<div
											class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
										>
											<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
												<div class="sm:flex sm:items-start">
													<div
														class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
													>
														<svg
															class="h-6 w-6 text-red-600"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															aria-hidden="true"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
															/>
														</svg>
													</div>
													<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
														<h3
															class="text-base font-semibold leading-6 text-gray-900"
															id="modal-title"
														>
															Delete post
														</h3>
														<div class="mt-2">
															<p class="text-sm text-gray-500">
																Are you sure you want to delete this post? This action cannot be
																undone.
															</p>
														</div>
													</div>
												</div>
											</div>
											<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
												<button
													type="button"
													class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
													on:click={async () => {
															await fetch(`/api/delete-post?id=${postDB.id}`, {
																method: 'DELETE'
															}).then((res) => {
																if (res.ok) {
																	goto('/');
																}
															});
													}}>Delete</button
												>
												<button
													type="button"
													class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
													on:click={() => {
														showModal = false;
													}}>Cancel</button
												>
											</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
					<LikeButton {isLiked} postId={postDB.id} />
				</div>
				<div class="overflow-y-auto flex-grow min-h-[330px]" id='comments'>
					<div class="px-7">
						<h1 class="text-3xl">{postDB.title}</h1>
						<ul class="flex gap-2 mt-2">
							{#each postDB.tags as tag}
								<li><a class="text-blue-500" href="/search/{tag}">#{tag}</a></li>
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
					<div class="flex flex-col px-7 mb-2">
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
					class="flex items-center bottom-0 rounded-br-2xl w-full px-4 gap-2 border-t h-20 border-gray-400"
				>
					<div class="flex w-full items-center gap-2">
						{#if data.auth}
							<img
								class="h-14 w-14 rounded-full object-cover"
								src={currentUserImage}
								alt="profile"
							/>
							<form class="flex flex-grow items-center gap-2" method="POST" action="?/comment">
								<input
									class="rounded-full h-12 w-full bg-violet-100 text-xl border border-gray-500 p-4 dark:text-black placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
									placeholder="Enter comment"
									name="comment"
									on:input={(event) => {
										commentButtonDisabled = event.currentTarget.value.length === 0;
									}}
								/>
								<button
									class="bg-red-500 rounded-full p-2 flex text-2xl disabled:bg-gray-400 disabled:cursor-not-allowed"
									type="submit"
									disabled={commentButtonDisabled}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="26"
										height="26"
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
									<button class="rounded-2xl py-2 px-4 text-2xl border-b shadow-xl border-gray-400"
										>Login</button
									>
								</a>
							</div>
						{/if}
					</div>
				</div>
		</div>
	</div>
	<h1 class="text-3xl mt-6 mb-4">More to explore</h1>
	<Layout likedPosts={likedPosts} getPosts={getSimilarPosts}>
		<div class="flex justify-center w-full">
			No similar posts found
		</div>
	</Layout>
</div>