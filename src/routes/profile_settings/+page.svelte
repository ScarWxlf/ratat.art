<script lang="ts">
	export let data;
	export let form;
	let src = data.user.image as any;
	const loadFile = function (event: any) {
		var reader = new FileReader();
		reader.onload = function () {
			src = reader.result;
		};
		reader.readAsDataURL(event.target.files[0]);
	};
</script>

<div class="flex flex-col">
	<div class="flex flex-col">
		<h1 class="text-4xl font-bold">Edit profile data</h1>
		<p class="text-1xl mt-2" style="width: 500px;">
			Keep your personal details private. Information you add here is visible to anyone who can view
			your profile.
		</p>
		<div class="flex gap-5 items-end mt-3">
			<img class="h-36 w-36 rounded-full object-cover" src={src} alt="profile" />
			<form class='w-1/2 flex flex-col' method="POST" enctype="multipart/form-data" action="?/public_profile_picture">
				<div class="grid w-1/2 max-w-xs items-center gap-1.5">
					<label
						class="text-center cursor-pointer rounded-2xl p-2 text-sm border border-black dark:border-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Upload picture
						<input
							class="hidden"
							type="file"
							name="picture"
							id="picture"
							on:change={loadFile}
						/>
					</label>
				</div>
				<div class="mt-2 relative">
					<button class="ms-2 py-1 px-4 rounded-full bg-gray-300 w-4/12 dark:text-black" type="submit">Save</button>
					{#if form?.success}
						<p class="text-green-500 absolute">changes saved</p>
					{/if}
				</div>
			</form>
		</div>
		<form class='flex flex-col' method="POST" action="?/public_profile">
			<p class="text-2xl mt-3">Username</p>
			<input
				class=" mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-1/2 px-3 py-2 text-base cursor-pointer transition"
				type="text"
				name="username"
				value={data?.user?.username ? data.user.username : ''}
			/>
			{#if form?.successUsername}
					<p class="text-green-500">changes saved</p>
				{/if}
			<button class="mt-2 py-1 px-4 rounded-full bg-gray-300 w-1/2 dark:text-black" type="submit">Submit</button>
		</form>
	</div>
</div>
