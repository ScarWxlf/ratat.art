<script lang="ts">
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	let tags = data.tags;
	$: form?.tags && (tags = form.tags);
</script>

<div class="flex flex-col flex-grow">
		<h1 class="text-4xl font-bold">Edit filters data</h1>
		<p class="text-1xl mt-2" style="width: 500px;">Add tags you don't want to see.</p>
		<div class="flex mt-2 gap-2 flex-wrap w-8/12">
			{#if tags.length === 0}
				<p class="text-gray-500">No tags in the blacklist yet</p>
			{:else}
			{#each tags as tag}
				<form class="bg-black text-white h-10 flex ps-3 pe-1 rounded-3xl items-center"  method="POST" action="?/delete_tag">
					#
					<p class="text-center">{tag}</p>
					<input type="hidden" name="tag" value={tag}/>
					<button class="" type="submit"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="26"
							height="26"
							fill="currentColor"
							class="bi bi-x pointer-events-none"
							viewBox="0 0 16 16"
						>
							<path
								d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
							/>
						</svg></button
					>
					</form>
			{/each}
			{/if}
		</div>
		<form class="flex flex-col w-6/12" method="POST" action="?/filters_profile">
			<!-- <Input name='email' label='Email' value={data?.user?.email}/> -->
			<p class="text-2xl mt-3">Add tag</p>
			<input
				class="mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-1/2 px-3 py-1 text-base cursor-pointer transition"
				type="text"
				name="tag"
			/>
			{#if form?.success}
				<p class="text-green-500">Tag added success</p>
			{/if}
			{#if form?.successDelete}
				<p class="text-red-500">Tag delete success</p>
			{/if}
			<button class="mt-4 py-1 px-4 rounded-full bg-gray-300 w-1/2 dark:text-black" type="submit">Submit</button>
		</form>
</div>

<template id="tag">
	<div class="bg-black text-white h-10 flex ps-3 pe-1 rounded-3xl items-center">
		#
		<p class="text-center" />
		<button class=""
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="26"
				height="26"
				fill="currentColor"
				class="bi bi-x pointer-events-none"
				viewBox="0 0 16 16"
			>
				<path
					d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
				/>
			</svg></button
		>
	</div>
</template>