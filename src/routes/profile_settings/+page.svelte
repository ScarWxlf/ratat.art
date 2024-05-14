<script lang="ts">
	export let data;
	let src = data.user.image;
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
			<form class='w-1/2' method="POST" enctype="multipart/form-data" action="?/public_profile_picture">
				<div class="grid w-1/2 max-w-xs items-center gap-1.5">
					<label
						class="text-center rounded-2xl p-2 text-sm border border-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Upload picture
						<input
							class="hidden w-full rounded-md border border-black border-input bg-white text-sm text-gray-400 file:border-0 file:bg-black file:text-white file:text-sm file:font-medium"
							type="file"
							name="picture"
							id="picture"
							on:change={loadFile}
						/>
					</label>
				</div>
				<button class="mt-4 py-1 px-4 rounded-full bg-gray-300 w-4/12" type="submit">Save</button>
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
			<button class="mt-4 py-1 px-4 rounded-full bg-gray-300 w-1/2" type="submit">Submit</button>
		</form>
	</div>
</div>
