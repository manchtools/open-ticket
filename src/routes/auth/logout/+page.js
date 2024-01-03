import { goto } from '$app/navigation';
import { account } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';

export async function load() {
	try {
		await account.deleteSession('current');
	} catch (e) {
		console.log(e);
	}
	goto('/auth/login', { invalidateAll: true });
}
