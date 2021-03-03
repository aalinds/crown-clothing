import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyBfdtMmEyxNtMNB7VAKRJeYjGyDOqIiITc',
	authDomain: 'crown-db-28fb9.firebaseapp.com',
	projectId: 'crown-db-28fb9',
	storageBucket: 'crown-db-28fb9.appspot.com',
	messagingSenderId: '1076703943861',
	appId: '1:1076703943861:web:d42806a5da46c47aad32fc',
	measurementId: 'G-0S6V2PECZY',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const userSnapshot = await userRef.get();

	if (!userSnapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('Error Creating User: ', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
