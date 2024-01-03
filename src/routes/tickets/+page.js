import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export async function load() {
	try {
		const tickets = databases.listDocuments('main', 'tickets');
		return { tickets };
	} catch (e) {
		console.log(e);
	}
}
