<script>
	import '../app.css';
	import Header from './Header.svelte';
	import { dark } from '$lib/dark';

	export let data;

	function toggleDarkMode() {
		$dark = !$dark;
		if ($dark) {
			window.document.body.classList.add('dark', 'bg-slate-800');
		} else {
			window.document.body.classList.remove('dark', 'bg-slate-800');
		}
	}
</script>

<div class="dark:bg-slate-800">
	<Header>
		<nav>
			<ul class="flex flex-row justify-end gap-2">
				<li>
					<button on:click={() => toggleDarkMode()}>Dark Mode</button>
				</li>
				{#if data.auth}
					<li>
						<form method="POST" action="/api/sign-out">
							<button type="submit">sign out</button>
						</form>
					</li>
				{:else}
					<li>
						<a href="/sign-in">sign in</a>
					</li>
					<li>
						<a href="/sign-up">sign up</a>
					</li>
				{/if}
			</ul>
		</nav>
	</Header>

	<main>
		<div class="flex flex-row justify-center">а всё</div>

		<div class="h-11" />
		<slot />
	</main>
</div>
