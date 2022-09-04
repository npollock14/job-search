<script>
	export let row;
	export let col;

	const fallback = 'https://via.placeholder.com/150';
	const handleError = (ev) => (ev.target.src = fallback);
</script>

<div>
	<img src={row.icon} alt={row.icon} on:error={handleError} />
</div>

<style>
	img {
		display: block;
		max-width: 200px;
		max-height: 200px;
		width: auto;
		height: auto;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
