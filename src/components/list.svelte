<script>
	import SvelteTable from 'svelte-table';
	import { companies } from '../stores/companyStore';
	import { userCompanyData } from '../stores/companyStore';
	import imageComp from './imageComp.svelte';
	import StatusComp from './StatusComp.svelte';
	const rows = $companies.companies;
	// define column configs
	const columns = [
		{
			key: 'icon',
			title: 'Logo',
			value: (v) => v.icon,
			renderComponent: imageComp
		},
		{
			key: 'name',
			title: 'Name',
			value: (v) => v.name,
			sortable: true,
			filterOptions: (rows) => {
				// use first letter of name to generate filter
				let letrs = {};
				rows.forEach((row) => {
					let letr = row.name.charAt(0);
					if (letrs[letr] === undefined)
						letrs[letr] = {
							name: `${letr.toUpperCase()}`,
							value: letr.toLowerCase()
						};
				});
				// fix order
				letrs = Object.entries(letrs)
					.sort()
					.reduce((o, [k, v]) => ((o[k] = v), o), {});
				return Object.values(letrs);
			},
			filterValue: (v) => v.name.charAt(0).toLowerCase()
		},
		{
			key: 'pay',
			title: 'Pay',
			value: (v) => v.pay,
			sortable: true,
			filterOptions: (rows) => {
				let nums = {};
				rows.forEach((row) => {
					let num = Math.floor(row.pay / 10);
					if (nums[num] === undefined)
						nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
				});
				// fix order
				nums = Object.entries(nums)
					.sort()
					.reduce((o, [k, v]) => ((o[k] = v), o), {});
				return Object.values(nums);
			},
			filterValue: (v) => Math.floor(v.pay / 10)
		},
		{
			key: 'status',
			title: 'Status',
			value: (v) => v.icon,
			renderComponent: StatusComp
		}
	];
</script>

<div class="table-container">
	<SvelteTable
		{columns}
		{rows}
		classNameTable={['table table-striped']}
		classNameThead={['table-primary']}
		classNameSelect={['custom-select']}
	/>
</div>

<style>
	.table-container :global(.table-striped > tbody > tr:nth-child(odd)) {
		background-color: #f5f5f5;
	}

	.table-container :global(.table-striped > tbody > tr:hover) {
		background-color: grey;
		transition: all 0.1s ease-in-out;
	}

	.table-container :global(.table > thead > tr > th) {
		background: #181a1b;
		color: #fff;
		padding: 5px;
	}

	.table-container {
		width: 100%;
		height: 100%;
	}
</style>
