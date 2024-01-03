import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export async function load() {
	const res = await databases.listDocuments('main', 'authProvider', [Query.equal('enabled', true)]);

	return { provider: res.documents };
}
