<script>
	import src from '$lib/images/saved.jpg';
    import LikeButton from '$lib/components/Like-Button.svelte';

	const post = {
		title: 'Post Title',
		description: 'Post Description',
		owner: {
			image: '/uploads/profilePictures/3.jpg',
			username: 'username',
			subs: 0
		},
        tags: ['#cat', '#orange'],
		comments: [
			{
				owner: {
					image: '/uploads/profilePictures/3.jpg',
					username: 'username'
				},
				content: 'Comment Content'
			}
		]
	};
</script>

<div class="flex w-full justify-center mt-1">
	<div class="flex w-8/12 bg-gray-200 rounded-2xl">
		<div class="w-6/12">
			<img class=" rounded-tl-2xl rounded-bl-2xl object-cover" {src} alt="post" />
		</div>
		<div class="w-6/12">
			<div class="flex flex-col">
				<div class="flex justify-start py-3 h-32 px-3">
                    <LikeButton/>
				</div>
                <h1 class="text-3xl px-3">{post.title}</h1>
                <ul class="flex gap-2 px-3 mt-2">
                    {#each post.tags as tag}
                        <li>{tag}</li>
                    {/each}
                </ul>
                <p class="text-xl px-3 mt-2">{post.description}</p>
			</div>
		</div>
	</div>
</div>