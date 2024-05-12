<script>
	import '../app.css';
	import Header from './Header.svelte';
	import { dark } from '$lib/dark';
	import {page} from '$app/stores';

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

<svelte:head>
	<title>ratat.art</title>
	<meta name="description" content="ratat.art" />
</svelte:head>

<div class="flex dark:bg-slate-800 dark:text-white min-h-screen">
	<Header>
		<nav>
			
			<ul class="flex flex-row justify-end items-center gap-4">
				<li>
					<label>
						<input class="toggle-checkbox" type="checkbox" on:click={() => toggleDarkMode()}>
						<div class="toggle-slot">
						  <div class="sun-icon-wrapper hidden">
							<div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
						  </div>
						  <div class="toggle-button"></div>
						  <div class="moon-icon-wrapper hidden">
							<div class="iconify moon-icon hidden" data-icon="feather-moon" data-inline="false"></div>
						  </div>
						</div>
					  </label>
				</li>
				{#if data.auth}
					<li>
						<a href="/user/{data?.username}">profile</a>
					</li>
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

	<main class="flex flex-col flex-grow">
		<div class="h-14" />
		{#key $page.url}
			<slot />
		{/key}
	</main>
</div>

<style>
	.toggle-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.toggle-slot {
  font-size: 7px;
  position: relative;
  height: 3.5em;
  width: 7em;
  border: 0px solid transparent;
  border-radius: 10em;
  background-color: rgb(226, 226, 226);
  transition: background-color 250ms;
}

.toggle-checkbox:checked ~ .toggle-slot {
  background-color: #374151;
}

.toggle-button {
  transform: translate(0.3em, 0.25em);
  position: absolute;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 0.75em #ffbb52;
  transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .toggle-button {
  background-color: #485367;
  box-shadow: inset 0px 0px 0px 0.75em white;
  transform: translate(3.65em, 0.25em);
}

.sun-icon {
  position: absolute;
  height: 6em;
  width: 6em;
  color: #ffbb52;
}

.sun-icon-wrapper {
  position: absolute;
  height: 6em;
  width: 6em;
  opacity: 1;
  transform: translate(2em, 2em) rotate(15deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
  opacity: 0;
  transform: translate(3em, 2em) rotate(0deg);
}

.moon-icon {
  position: absolute;
  height: 6em;
  width: 6em;
  color: white;
}

.moon-icon-wrapper {
  position: absolute;
  height: 6em;
  width: 6em;
  opacity: 0;
  transform: translate(11em, 2em) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
  opacity: 1;
  transform: translate(2em, 2em) rotate(-15deg);
}
</style>