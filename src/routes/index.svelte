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
	import List from '../components/list.svelte';

	let allCompanies = $companies['companies'];

	function onRightClick(company) {
		console.log('right clicked on ' + company.name);
		if ($loggedIn) {
			set(ref(db, 'users/' + $user.uid + '/companies/' + company.name + '/app'), 'in_progress');
			// $userCompanyData[company.name]['app'] = 'in_progress';
		}
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
					app: '',
					oa: '',
					interview: '',
					offer: ''
				}
			}
		});
	}

	function getBGColor(companyName, field) {
		//if companys contains companyName
		let fieldData = JSON.stringify($userCompanyData.companies);
		if (!fieldData) return '#fff';
		console.log(fieldData);
		fieldData = fieldData[companyName];
		if (fieldData) {
			switch (fieldData) {
				case 'in_progress':
					return '#f5f5f5';
				case 'complete':
					return '#dff0d8';
				case 'rejected':
					return '#f2dede';
				default:
					return '#fff';
			}
		}
		return '#fff';
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
					userCompanyData.set(JSON.stringify(data.companies));
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

<div class="list-container">
	<List />
</div>

<style>
	.list-container {
		width: 100%;
		height: 100%;
	}
</style>
