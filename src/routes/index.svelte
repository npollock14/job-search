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
	import { ref, set, get } from 'firebase/database';
	import { db } from '../firebase.js';

	let allCompanies = $companies['companies'];

	function onRightClick(company) {
		console.log('right clicked on ' + company.name);
	}

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

	function addNewUser(userId, name, email, imageUrl) {
		set(ref(db, 'users/' + userId), {
			username: name,
			email: email,
			profile_picture: imageUrl,
			companies: {
				template: {
					interest: '0',
					applied: '0'
				}
			}
		});
	}

	async function userExists(userId) {
		let userRef = ref(db, 'users/' + userId);
		let snapshot = await get(userRef);
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			return false;
		}
	}

	$: {
		//when user is logged in, write their data to the database
		if ($loggedIn) {
			userExists($user.uid).then((data) => {
				if (!data) {
					console.log('user does not exist, creating new user in db');
					addNewUser($user.uid, $user.displayName, $user.email, $user.photoURL);
					userCompanyData.set({ companies: {} });
				} else {
					console.log('user already exists');
					//log data
					userCompanyData.set(JSON.stringify(data));
					console.log($userCompanyData);
				}
			});
		}
	}
</script>

<svelte:head>
	<title>The List</title>
</svelte:head>

<svelte:window bind:innerWidth />

<div transition:fade={{ duration: 100 }}>
	{#if !$smallScreen}
		<h1 class="text-4xl text-center my-4 uppercase">The List</h1>

		<div class="flex justify-center w-full">
			<div class="w-full max-w-lg">
				<input
					bind:value={query}
					on:focus={() => (searchSelected = true)}
					on:blur={() => (searchSelected = false)}
					class="w-full border border-gray-300 rounded-lg p-2 m-1"
					type="text"
					placeholder="Search..."
				/>
			</div>
		</div>
	{/if}

	{#if !noResults}
		<div class="flex flex-wrap justify-center {$smallScreen ? 'small' : ''}">
			<table class="w-50 mt-{$smallScreen ? '0' : '10'}">
				<thead>
					<tr>
						<th>Icon</th>
						<th>Company</th>
						<th>Pay</th>
						{#if $loggedIn}
							<th colspan="2">Status</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each allCompanies as company}
						<tr
							id="row"
							class={query == ''
								? ''
								: company.name.toLowerCase().includes(query.trim().toLowerCase())
								? ''
								: 'collapsed'}
							on:contextmenu|preventDefault={() => {
								onRightClick(company);
							}}
							on:click={() => {
								// open a new tab searching for the company
								window.open(
									`https://www.google.com/search?q=${company.name} software engineer careers`,
									'_blank'
								);
							}}
						>
							<td class="text-left {$smallScreen ? 'small' : ''}" id="iconCol">
								<img
									referrerpolicy="no-referrer"
									src={company.icon}
									alt={company.name}
									on:error={({ target }) => {
										console.log('error');
										//set src to a default image
										target.src = 'https://via.placeholder.com/150';
									}}
									class="w-32"
								/>
							</td>
							<td class="text-left font-bold  {$smallScreen ? 'small' : ''}" id="nameCol"
								>{company.name}</td
							>
							<td class="text-left font-bold  {$smallScreen ? 'small' : ''}">{company.average}</td>
							{#if $loggedIn}
								<td bgcolor="green" />
								<td bgcolor="blue" />
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="flex justify-center">
			<div class="w-full max-w-lg">
				<p class="text-center text-gray-500">No results found!</p>
			</div>
		</div>
	{/if}
</div>

<style>
	td {
		padding: 0.5rem;
		text-transform: capitalize;
		height: 100px;
		font-size: xx-large;
		border: 2px solid black;
	}

	td.small {
		/* height: fit-content; */
		/* width: fit-content; */
	}

	th {
		border: 2px solid black;
	}

	#row {
		cursor: pointer;
	}
	.collapsed {
		visibility: collapse;
	}
	.small {
		/* max-width: fit-content; */
		font-size: large;
	}

	#row:hover {
		background: grey;
		color: #181a1b;
		transition: 0.2s;
	}
	#nameCol {
		word-wrap: normal;
		max-width: 500px;
	}

	#nameCol.small {
		max-width: 250px;
	}

	#iconCol {
		max-width: fit-content;
		min-width: 75px;
	}
</style>
