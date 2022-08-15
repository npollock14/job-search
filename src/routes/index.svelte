<script>
	import {
		companies,
		loggedIn,
		user,
		smallScreen,
		userCompanyData
	} from '../stores/companyStore.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import List from '../components/list.svelte';

	let allCompanies = $companies['companies'];

	// function onRightClick(company) {
	// 	console.log('right clicked on ' + company.name);
	// 	if ($loggedIn) {
	// 		set(ref(db, 'users/' + $user.uid + '/companies/' + company.name + '/app'), 'in_progress');
	// 		// $userCompanyData[company.name]['app'] = 'in_progress';
	// 	}
	// }

	let query = '';
	let innerWidth = 1000;

	onMount(() => {
		innerWidth = window.innerWidth;
		smallScreen.set(innerWidth < 600);
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	let noResults = false;
	let searchSelected = false;

	$: {
		smallScreen.set(innerWidth < 600);
		noResults = updateNoResults(query);
	}

	function updateNoResults(query) {
		if (query.length > 0) {
			return (
				allCompanies.filter((company) => company.name.toLowerCase().includes(query.toLowerCase()))
					.length === 0
			);
		} else {
			return false;
		}
	}

	function onKeyDown(e) {
		if (searchSelected) {
			return;
		}
		//if backspace is hit, remove last character from query
		if (e.keyCode == 8) {
			query = query.slice(0, -1);
		} else {
			//add character to query
			query += e.key;
		}
	}
</script>

<svelte:head>
	<title>The List</title>
</svelte:head>

<svelte:window bind:innerWidth />

<div class="list-container">
	<List />
</div>

<style>
	.list-container {
		width: 100%;
		height: 100%;
	}
</style>
