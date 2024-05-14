<script lang="ts">
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';

	const SITE_KEY = env.PUBLIC_RECAPTCHA_SITE_KEY;

	export let form;
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={SITE_KEY}" async defer></script>
</svelte:head>

<div class="flex items-center justify-center h-full">
	<div class="container items-center flex flex-col">
		<form
			method="POST"
			action="?/sign-in"
			class="flex flex-col justify-center items-center gap-8 p-8 border-black border-2 rounded-md border-opacity-20"
			use:enhance={async ({ formData }) => {
				await new Promise(grecaptcha.ready);
				let token = await grecaptcha.execute(SITE_KEY, { action: 'submit' });
				formData.append('g-recaptcha-response', token);

				return async ({ result, update }) => {
					// `result` is an `ActionResult` object
					// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
					update();

					let badge = document.querySelector('.grecaptcha-badge');
					// @ts-ignore
					if (badge) badge.style.visibility = 'hidden';
				};
			}}
		>
			<h1 class="text-3xl font-bold mb-2">Welcome back</h1>
			<div class="relative h-10 w-full min-w-[200px]">
				<input
					class="peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 focus:border-2 focus:border-stone-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
					name="email"
					type="email"
					placeholder=" "
					value={form?.email ?? ''}
				/>
				<label
					for=""
					class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-stone-950 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-stone-950 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-stone-950 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
				>
					Email
				</label>
				{#if form?.missing?.email}<p class="text-red-400">The email field is required</p>{/if}
			</div>

			<div class="relative h-10 w-full min-w-[200px]">
				<input
					class="peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 focus:border-2 focus:border-stone-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
					placeholder=" "
					name="password"
					type="password"
				/>
				<label
					for=""
					class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-stone-950 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-stone-950 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-stone-950 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
				>
					Password
				</label>
				{#if form?.missing?.password}<p class="text-red-400">The password field is required</p>{/if}
			</div>

			{#if form?.message}<p class="text-red-400">{form.message}</p>{/if}

			<div class="flex flex-row-reverse w-full">
				<button
					class="border w-full border-gray-500 rounded-lg py-1 px-1 pb-1 duration-300 hover:bg-gray-200 hover:outline-2"
					type="submit">Sign in</button
				>
			</div>
		</form>
	</div>
</div>
