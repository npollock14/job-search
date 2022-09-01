<script>
	import {
		companies,
		loggedIn,
		user,
		smallScreen,
		userCompanyData
	} from '../stores/companyStore.js';
	import { onMount } from 'svelte';

import IntrestList from '../components/intrestList.svelte';

	let innerWidth = 1000;

	onMount(() => {
		innerWidth = window.innerWidth;
		smallScreen.set(innerWidth < 600);
	});

	let noResults = false;
	let searchSelected = false;

</script>

<svelte:head>
	<title>The List</title>
</svelte:head>

<svelte:window bind:innerWidth />

<div class="list-container">
	<IntrestList />
</div>

<style>
	.list-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	
</style>
