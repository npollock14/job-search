<script>
	import '../app.css';
	import Nav from '../components/Nav.svelte';
</script>

<svelte:body />

<div>
	<Nav />
	<slot><!-- optional fallback --></slot>
</div>

<style>
	:global(body) {
		background: lightgrey;
	}
</style>
