import { databases } from '$lib/appwrite';

export async function load({ params }) {
	try {
		const ticket = await databases.getDocument('main', 'tickets', params.id);
		console.log(ticket);
		return { ticket };
	} catch (e) {
		console.log(e);
	}
}
