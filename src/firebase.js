import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBVKHmrPNaUpsyq3ps_WpItmXyrnYSkM-Q',
	authDomain: 'job-list-3df46.firebaseapp.com',
	databaseURL: 'https://job-list-3df46-default-rtdb.firebaseio.com',
	projectId: 'job-list-3df46',
	storageBucket: 'job-list-3df46.appspot.com',
	messagingSenderId: '808163417553',
	appId: '1:808163417553:web:78d72839135480e61ed4f0',
	measurementId: 'G-W7SF9Y8DKH'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
