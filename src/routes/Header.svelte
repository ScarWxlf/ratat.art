<script lang="ts">
	import { dark } from '$lib/dark';
</script>

<div class="fixed w-full bg-white dark:bg-slate-900 dark:text-white z-50 h-11">
	<header class="flex flex-row p-2">
		<a href="/">🐁 ratat.art</a>
		<div class="flex-grow" />
		<slot />
	</header>
</div>
