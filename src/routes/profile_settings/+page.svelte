<script lang='ts'>
	import src from '$lib/images/profile.jpg';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
</script>

<div class="flex flex-col">
	<div class="flex flex-col">
		<h1 class="text-4xl font-bold">Edit profile data</h1>
		<p class="text-1xl mt-2" style="width: 500px;">
			Keep your personal details private. Information you add here is visible to anyone who can view
			your profile.
		</p>
		<form method="POST" action="?/public_profile">
			<div class="flex gap-5 items-end mt-3">
				<img class="h-36 w-36 rounded-full mt" {src} alt="profile" />
				<div class="grid w-full max-w-xs items-center gap-1.5">
					<label
						class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Picture
						<input
							class="flex w-full rounded-md border border-black border-input bg-white text-sm text-gray-400 file:border-0 file:bg-black file:text-white file:text-sm file:font-medium"
							type="file"
                            name="picture"
							id="picture"
						/>
					</label>
				</div>
			</div>
            <p class="text-2xl mt-3">Username</p>
			<input
				class=" mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-96 px-6 py-3 text-base cursor-pointer transition"
				type="text"
                name="username"
				value={data?.user?.username ? data.user.username : ''}
			/>
            <button class="mt-4 py-2 px-4 rounded-full bg-gray-400 w-4/12" type="submit">Submit</button>
		</form>
	</div>
</div>
