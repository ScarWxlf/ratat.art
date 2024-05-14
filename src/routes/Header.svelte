<script lang="ts">
	import { dark } from '$lib/dark';

	let isSearchOpen = false;
	let searchItems = [];
	let searchValue = '';
	let allTags = new Set();

	const handleSearch = async (e) => {
		searchValue = e.target.value;
		if (e.target.value === '') {
			searchItems = [];
			return;
		}
		const res = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ search: e.target.value })
		});
		const data = await res.json();
		searchItems = data.searchResult;
	};
</script>

<div
	class="fixed w-full bg-white dark:bg-slate-900 dark:text-white z-50 h-11"
>
	<header class="flex flex-row items-center p-2">
		<a href="/">🐁 Ratat.art</a>
		<a href="/create-post" class="ms-3 px-2 rounded-2xl">Create</a>

		<div class="flex mx-8 flex-grow form relative justify-center  dark:bg-slate-900 dark:text-white">
			<button>
				<svg
					width="17"
					height="16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-labelledby="search"
				>
					<path
						d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
						stroke="currentColor"
						stroke-width="1.333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<input
				class="input"
				bind:value={searchValue}
				on:input={handleSearch}
				on:click={() => {
					isSearchOpen = true;
				}}
				placeholder="Type your text"
				type="text"
			/>
			<button class="reset me-2" type="reset" on:click={()=>{
				searchValue = '';
				searchItems = [];
			}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<slot />
	</header>
	<div
		class="flex flex-col items-center w-screen h-screen absolute bg-black bg-opacity-50 {isSearchOpen
			? ''
			: 'hidden'}"
		on:click={() => {
			isSearchOpen = false;
		}}
		role="button"
		tabindex="0"
		on:keydown={() => {}}
	>
		<div class="w-3/4 h-auto bg-white rounded-b-2xl overflow-y-auto">
			{#if searchItems && searchItems.length > 0}
				{#each searchItems as item, index}
					{#if index < 10}
						{#if item.type === 'name'}
						<a class="flex items-center w-full h-12 ps-3 hover:bg-gray-300" href={`/post/${item.id}`}>
							<div class="flex items-center ms-3 gap-2">
								🔍 {item.title}
							</div>
						</a>
						{:else if item.type === 'tag'}
						<a class="flex items-center w-full h-12 ps-3 hover:bg-gray-300" href={`/search/${item.tag}`}>
							<div class="flex items-center ms-3 gap-2">
									🔍 #{item.tag}
								</div>
							</a>  
						{:else if item.type === 'user'}
						<a class="flex items-center w-full h-16 ps-3 hover:bg-gray-300" href={`/user/${item.username}`}>
							<div class="flex items-center ms-3 gap-2">
									<img
										class="h-14 w-14 rounded-full object-cover"
										src={item.image}
										alt={item.title}
									/>
									{item.username}
								</div>
							</a>
						{/if}
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.form button {
		border: none;
		background: none;
		color: #8b8ba7;
	}

	.form {
		--timing: 0.3s;
		--width-of-input: 200px;
		--height-of-input: 30px;
		--border-height: 2px;
		--input-bg: #fff;
		--border-color: #000000;
		--border-radius: 30px;
		--after-border-radius: 1px;
		position: relative;
		width: var(--width-of-input);
		height: var(--height-of-input);
		display: flex;
		align-items: center;
		border-radius: var(--border-radius);
		transition: border-radius 0.5s ease;
		border: 2px solid transparent;
		border-color: rgb(153, 153, 153);
		transition: border-color var(--timing) ease, border-radius 0.5s ease;
	}
	/* styling of Input */
	.input {
		font-size: 0.9rem;
		background-color: transparent;
		width: 100%;
		height: 50%;
		padding-inline: 0.5em;
		padding-block: 0.7em;
		border: none;
	}
	/* styling of animated border */
	.form:focus-within {
		border-color: var(--border-color);
		border-radius: var(--after-border-radius);
	}
	/* Hover on Input */
	.form:focus-within {
		border-radius: var(--border-radius);
	}

	input:focus {
		outline: none;
	}
	/* here is code of animated border */
	.form:focus-within:before {
		transform: scale(1);
	}
	/* styling of close button */
	/* == you can click the close button to remove text == */
	.reset {
		border: none;
		background: none;
		opacity: 0;
		visibility: hidden;
	}
	/* close button shown when typing */
	input:not(:placeholder-shown) ~ .reset {
		opacity: 1;
		visibility: visible;
	}
	/* sizing svg icons */
	.form svg {
		width: 17px;
		padding-left: 3px;
	}
</style>
