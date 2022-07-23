<script>
	import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 100 }}>
	<h1 class="text-4xl text-center my-8 uppercase">About</h1>
	<p>This is the about page.</p>
</div>

<svelte:head>
	<title>Svelte Kit Pokedex - About</title>
</svelte:head>
