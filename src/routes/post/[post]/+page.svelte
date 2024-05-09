<script lang="ts">
	import src from '$lib/images/saved.jpg';
	import LikeButton from '$lib/components/Like-Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data?.user;
	const postOwner = data.postOwner; 
	const postDB= data.post;
	const currentUserImage = `/uploads/profilePictures/${user.userId}.jpg`;
	const postUserImage = `/uploads/profilePictures/${postOwner.userId}.jpg`;

	// table coments 
	// id postId userId content

	//table likes
	// id postId userId

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
		tags: ['#cat', '#orange'],
		comments: [
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			},
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'ScarWxlf'
				},
				content:
					'Im good. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
			}
		]
	};
	
</script>

<div class="flex w-full justify-center mt-1 mb-10">
	<div class="flex w-8/12 bg-gray-200 rounded-2xl shadow-2xl">
		<div class="w-6/12">
			<img class=" rounded-tl-2xl rounded-bl-2xl object-cover" src={postDB.image} alt="post" />
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
					<LikeButton />
				</div>
				<div class="overflow-x-auto max-h-[585px]">
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
						<div class="flex">
							<img class="h-14 w-14 rounded-full" src={postUserImage} alt="profile" />
							<div class="px-2">
								<p class="text-xl">{postOwner.username}</p>
								<p class="text-sm">{post.owner.subs} subscribers</p>
							</div>
						</div>
						<div>
							<button class="text-white mt-2 bg-red-500 py-2 px-4 rounded-3xl">Subscribe</button>
						</div>
					</div>
					<div class="flex flex-col px-7">
						<p class="text-xl">Comments</p>
						{#if post.comments.length === 0}
							<p class="w-full mt-1">No comments yet! Add one to start the conversation.</p>
						{:else}
							<ul class="flex flex-col mt-5">
								{#each post.comments as coment}
									<li class="py-2">
										<div class="flex gap-2">
											<img class="h-10 w-10 rounded-full" src={coment.owner.image} alt="profile" />
											<p>
												<span class="font-medium">{coment.owner.username}</span>
												{coment.content}
											</p>
										</div>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
				<div
					class="flex items-center absolute bottom-0 rounded-br-2xl w-full px-7 gap-2 border-t h-20 border-gray-400"
				>
					<div class="flex w-full">
						<img class="h-16 w-16 rounded-full" src={currentUserImage} alt="profile" />
						<input
							class="w-full rounded-full bg-violet-100 text-xl border-2 border-gray-500 p-4 placeholder-gray-400 focus:text-violet-950 focus:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
							placeholder="Enter comment"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
