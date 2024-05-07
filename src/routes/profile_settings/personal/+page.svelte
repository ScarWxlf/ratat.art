<script>
    // import Input from '$lib/components/Input.svelte';
    export let data;
</script>

<div class="flex flex-col">
	<div class="flex flex-col">
		<h1 class="text-4xl font-bold">Edit personal data</h1>
		<p class="text-1xl mt-2" style="width: 500px;">
			Make changes to your personal information or account type.
		</p>
		<form class="flex flex-col">
            <!-- <Input name='email' label='Email' value={data?.user?.email}/> -->
			<p class="text-2xl mt-3">Email</p>
			<input
				class=" mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-96 px-6 py-3 text-base cursor-pointer transition"
				type="text"
                value={data?.user?.email ? data.user.email : ''}
			/>
			<p class="text-2xl mt-3">Old password</p>
			<input
				class=" mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-96 px-6 py-3 text-base cursor-pointer transition"
				type="text"
			/>
			<p class="text-2xl mt-3">New password</p>
			<input
				class=" mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-96 px-6 py-3 text-base cursor-pointer transition"
				type="text"
			/>
            <button class="mt-4 py-2 px-4 rounded-full bg-gray-400 w-4/12" type="submit">Submit</button>
		</form>
	</div>
</div>
