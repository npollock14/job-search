<script>
	import { userCompanyData } from '../stores/companyStore';
	import { loggedIn, user } from '../stores/companyStore';
	import { ref, set, get } from 'firebase/database';
	import { db } from '../firebase.js';

	let boxColor = 'white';

	export let row;

	$: {
		if ($loggedIn) {
			boxColor = 'purple';
			console.log('here');
			if ($userCompanyData[row.name] !== undefined && $userCompanyData[row.name]['interested'] === '1') {
				boxColor = 'red';
			}
		}
	}

	function handleStatusClick() {
		if (!$loggedIn) {
			return;
		}
		console.log('status clicked');
		//check if user has company data for this company
		if ($userCompanyData[row.name] !== undefined && $userCompanyData[row.name]['interested'] === '1') {
			//delete company data
			console.log('deleting');
			set(ref(db, 'users/' + $user.uid + '/companies/' + row.name + '/interested'), '0');
		} else {
			//add company data
			console.log('adding');
			set(ref(db, 'users/' + $user.uid + '/companies/' + row.name + '/interested'), '1');
		}

	}
</script>

<div>
	<svg on:click={handleStatusClick}>
		<rect x="0" y="0" width="100" height="100" fill={boxColor} />
	</svg>
</div>

<style>
	svg {
		cursor: pointer;
	}
</style>
