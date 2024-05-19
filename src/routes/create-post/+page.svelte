<script lang="ts">
	export let form;

	let loading = true;
	let image;
	const loadFile = function (event: any) {
		var reader = new FileReader();
		reader.onload = function () {
			image!.src = reader.result;
			loading = false;
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const handleAddTag =()=>{
		const tags = document.getElementById('hiddenTags') as HTMLInputElement;
		const tagInput = document.querySelector('input[name="tags"]') as HTMLInputElement;
		const tag = tagInput.value;
		if(tags.value.split(',').includes(tag) || tag === ''){
			tagInput.value = '';
			return;
		}
		if(tags.value === ''){
			tags.value = tag;
		}else{
			tags.value += `,${tag}`;
		}
		tagInput.value = '';
	
		const tagTemplate = document.getElementById('tag') as HTMLTemplateElement;
		const tagClone = tagTemplate.content.cloneNode(true) as HTMLElement;
		const button = tagClone.querySelector('button') as HTMLButtonElement;
		const p = tagClone.querySelector('p') as HTMLParagraphElement;
		p.innerText = tag;
		button.addEventListener('click', deleteButton);
		const allTags = document.getElementById('tagsButtons') as HTMLElement;
		allTags.appendChild(tagClone);
	}

	const deleteButton = (e: any) => {
		e.target.parentElement.remove()
	}
</script>

<div class="flex flex-col w-full">
	<div class="w-full flex border border-gray-500 h-24 items-center">
		<h1 class="ms-16 text-4xl font-bold">Create post</h1>
	</div>
	<form
		class="flex justify-center"
		method="POST"
		enctype="multipart/form-data"
		action="?/create-post"
	>
		<div class="w-6/12 flex flex-col justify-center items-center max-h-[500px] max-w-[500px] mt-4 ms-2">
			<div
				class="flex justify-center items-center bg-gray-200 h-[450px] w-7/12 rounded-2xl relative {loading
					? ''
					: 'hidden'}"
			>
				<div class="flex flex-col items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						class="bi bi-upload"
						viewBox="0 0 16 16"
					>
						<path
							d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
						/>
						<path
							d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"
						/>
					</svg>
					<p class="text-lg w-10/12 text-center">
						Choose a file or drag and drop it here to upload
					</p>
				</div>
				<input
					class="bg-red-100 h-full w-full absolute opacity-0"
					type="file"
					name="postPicture"
					accept="image/*"
					on:change={loadFile}
				/>
			</div>
			<img
				class="h-full object-cover rounded-2xl {!loading ? '' : 'hidden'}"
				bind:this={image}
				id="output"
				alt="preview"
			/>
			{#if form?.imageMessage}
				<p class=" text-red-500">{form?.imageMessage}</p>
			{/if}
		</div>
		<div class="w-6/12">
			{#if form?.succes}
				<p class="text-green-500 text-3xl">Post created ura</p>
			{/if}
			<div class="flex flex-col gap-4 w-full mt-6">
				<div class="px-3 w-7/12">
					<p class="text-lg">Title</p>
					<input
						class="h-11 w-full rounded-xl text-xl border-2 border-gray-500 p-4 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
						placeholder="Add a title"
						name="title"
					/>
					{#if form?.titleMessage}
						<p class=" text-red-500">{form?.titleMessage}</p>
					{/if}
				</div>
				<div class="px-3 w-7/12">
					<p class="text-lg">Description</p>
					<textarea
						class="h-32 w-full resize-none rounded-xl text-xl border-2 border-gray-500 p-4 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
						placeholder="Add a Description"
						name="description"
					/>
				</div>
				<form class="flex flex-col px-3 w-7/12" on:submit|preventDefault ={handleAddTag}>
					<p class="text-lg">Tags</p>
					<input
						class="h-11 w-full rounded-xl text-xl border-2 border-gray-500 p-4 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
						placeholder="Add tag"
						name="tags"
					/>
					<button class="mt-2 bg-red-500 self-end text-white py-1 px-2 rounded-full text-lg w-3/12" type="submit"
						>Add tag</button
					>
				</form>
				<input type="hidden" name="hiddenTags" id="hiddenTags" value="">
				<div class="px-3 w-7/12 flex flex-grow gap-2 flex-wrap" id='tagsButtons'></div>
				<div class="w-7/12 flex justify-center">
					<button class="bg-red-500 text-white py-2 px-4 rounded-full text-lg w-4/12" type="submit"
					>Submit</button
					>
				</div>
			</div>
		</div>
	</form>
</div>

<template id='tag'>
	<div class="bg-black text-white h-10 flex ps-3 pe-1 rounded-3xl items-center">
		#
		<p class="text-center"></p>
		<button class=""><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x pointer-events-none" viewBox="0 0 16 16">
			<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
		  </svg></button>
	</div>
</template>