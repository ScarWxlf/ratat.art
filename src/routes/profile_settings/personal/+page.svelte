<script>
    // import Input from '$lib/components/Input.svelte';
    export let data;
	export let form;
</script>

<div class="flex flex-col">
	<div class="flex flex-col">
		<h1 class="text-4xl font-bold">Edit personal data</h1>
		<p class="text-1xl mt-2" style="width: 500px;">
			Make changes to your personal information or account type.
		</p>
		<form class="flex flex-col" method="POST" action="?/personal_profile_email">
			<p class="text-2xl mt-3">Email</p>
			<input
				class="mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-1/2 px-3 py-1 text-base cursor-pointer transition"
				type="email"
				name="email"
                value={data?.user?.email ? data.user.email : ''}
			/>
			{#if form?.message}
				<p class="text-red-400">{form.message}</p>
			{/if}
			{#if form?.successEmail}
				<p class="text-green-500">Email changed success</p>
			{/if}
			<button class="mt-4 py-1 px-4 rounded-full bg-gray-300 w-1/2 dark:text-black" type="submit">Submit</button>
		</form>
		<form class="flex flex-col" method="POST" action="?/personal_profile">
            <!-- <Input name='email' label='Email' value={data?.user?.email}/> -->
			<p class="text-2xl mt-3">Old password</p>
			<input
				class="mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-1/2 px-3 py-1 text-base cursor-pointer transition"
				type="password"
				name="old_password"
			/>
			<p class="text-2xl mt-3">New password</p>
			<input
				class="mt-3 bg-white border-2 border-[#3e3e3e] rounded-lg text-black w-1/2 px-3 py-1 text-base cursor-pointer transition"
				type="password"
				name="new_password"
			/>
			{#if form?.messagePassword}
				<p class="text-red-400">{form.messagePassword}</p>
			{/if}
			{#if form?.succesPassword}
				<p class="text-green-500">Password changed success</p>
			{/if}
            <button class="mt-2 py-1 px-4 rounded-full bg-gray-300 w-1/2 dark:text-black" type="submit">Submit</button>
		</form>
	</div>
</div>
