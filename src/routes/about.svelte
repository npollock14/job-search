<script>
	import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 100 }}>
	<h1 class="text-4xl text-center my-8 uppercase">About</h1>
	<p class="text-xl text-center my-8">
		Svelte app to help with the job application process. Made by Nathan Pollock.
	</p>
</div>

<svelte:head>
	<title>The List - About</title>
</svelte:head>

<style>
</style>
