<script>
	import { auth, provider } from '../firebase.js';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			console.log(token);
			console.log(user);
			console.log('Successfully signed in!');
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			console.log('ERROR During Sign in: ' + error);
		});
</script>

<h1>Login</h1>
