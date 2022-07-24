<script>
	import { auth, provider } from '../firebase.js';
	import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
	import { loggedIn, user, smallScreen } from '../stores/companyStore.js';

	function doLogIn() {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				console.log('Successfully signed in!');
				loggedIn.set(true);
				user.set(result.user);
			})
			.catch((error) => {
				// Handle Errors here.
				console.log('ERROR During Sign in: ' + error);
				loggedIn.set(false);
			});
	}

	function doLogOut() {
		signOut(auth)
			.then(() => {
				console.log('Successfully signed out!');
				loggedIn.set(false);
			})
			.catch((error) => {
				console.log('ERROR During Sign out: ' + error);
			});
	}
</script>

<nav class="flex justify-center w-full">
	<div id="navBtn">
		<a class="mx-4 text-lg" href="/">The List</a>
	</div>
	{#if !$smallScreen}
		<div id="navBtn">
			<a class="mx-4 text-lg" href="/about">About</a>
		</div>
	{/if}
	{#if $loggedIn}
		<div id="navBtn" on:click={doLogOut}>
			{#if !$smallScreen}
				<div class="mx-4 text-lg">Logout, {$user.displayName.split(' ')[0].toUpperCase()}</div>
			{:else}
				<div class="mx-4 text-lg">Logout</div>
			{/if}
		</div>
	{:else}
		<div id="navBtn" on:click={doLogIn}>
			<div class="mx-4 text-lg">Login</div>
		</div>
	{/if}
</nav>

<style>
	nav {
		background: #181a1b;
		width: 100%;
		padding: 0px;
		margin: 0px;
	}

	#navBtn {
		cursor: pointer;
		width: fit-content;
		margin: 20px;
		border: 1px solid #fff;
		color: #fff;

		text-decoration: none;
		font-size: 1.2rem;
		font-weight: bold;
		text-transform: uppercase;
	}
	#navBtn:hover {
		background: #fff;
		color: #181a1b;
		transition: 0.2s;
	}
</style>
