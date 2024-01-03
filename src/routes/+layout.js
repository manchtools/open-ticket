import { goto } from '$app/navigation';
import { account } from '$lib/appwrite';

export const ssr = false;

export async function load({ route }) {
	let user = undefined;
	try {
		user = await account.get();
	} catch (e) {
		console.log(e);
	}
	if (user === undefined) {
		if (route.id !== '/auth/login') {
			goto('/auth/login');
		}
	} else {
		if (route.id === '/auth/login') {
			goto('/');
		}

		return { user };
	}
}
