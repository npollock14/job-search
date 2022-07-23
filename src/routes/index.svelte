<script>
	import { companies } from '../stores/companyStore.js';
	import { fade } from 'svelte/transition';

	let allCompanies = $companies['companies'];

	function onRightClick(company) {
		console.log('right clicked on ' + company.name);
	}

	let query = '';
</script>

<div transition:fade={{ duration: 100 }}>
	<h1 class="text-4xl text-center my-4 uppercase">The List</h1>
	<div class="flex justify-center w-full">
		<div class="w-full max-w-lg">
			<input
				bind:value={query}
				class="w-full border border-gray-300 rounded-lg p-2 m-1"
				type="text"
				placeholder="Search..."
			/>
		</div>
	</div>

	{#if allCompanies.length > 0}
		<div class="flex flex-wrap justify-center">
			<table class="w-50 mt-10">
				<thead>
					<tr>
						<th>Company</th>
						<th>Position</th>
						<th>Pay</th>
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
							<td class="text-left">
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
							<td class="text-left font-bold" id="nameCol">{company.name}</td>
							<td class="text-left font-bold">${company.average}/hr</td>
						</tr>
					{/each}
				</tbody>
			</table>
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
	th {
		border: 2px solid black;
	}

	#row {
		cursor: pointer;
	}
	.collapsed {
		visibility: collapse;
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
</style>
