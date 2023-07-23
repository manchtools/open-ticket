import { Account, Avatars, Client, Teams, Storage, Databases, Query, Health } from 'node-appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
export const AppwriteEndpoint = PUBLIC_APPWRITE_ENDPOINT;
export const AppwriteProject = PUBLIC_APPWRITE_PROJECT;

export const client = new Client()
	.setEndpoint(AppwriteEndpoint)
	.setProject(AppwriteProject)
	.setSelfSigned();
const account = new Account(client);
const avatars = new Avatars(client);
const teams = new Teams(client);
const storage = new Storage(client);
const databases = new Databases(client);
export const AppwriteNodeService = {
	signOut: async () => {
		await account.deleteSession('current');
	},
	getAccount: async () => {
		return await account.get();
	},
	getSessions: async () => {
		return await account.listSessions();
	},
	getMemberships: async (query = [], search) => {
		return await teams.list(query, search);
	},
	getMyTickets: async () => {
		const account = await AppwriteNodeService.getAccount();
		return await databases.listDocuments('ticketing', 'tickets', [
			Query.equal('createdBy', account.$id),
			Query.orderDesc('$createdAt')
		]);
	},
	getAgents: async () => {
		return await databases.listDocuments('ticketing', 'agents');
	},
	createTicket: async (subject, body) => {
		const account = await AppwriteNodeService.getAccount();
		return await databases.createDocument('ticketing', 'tickets', 'unique()', {
			subject,
			body,
			createdBy: account.$id
		});
	},
	setSession: (hash) => {
		const authCookies = {};
		authCookies['a_session_' + AppwriteProject] = hash;
		client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);
	}
};
export const AppwriteNodeAgentService = {
	getOpenTickets: async () => {
		return await databases.listDocuments('ticketing', 'tickets', [
			Query.notEqual('status', 'closed')
		]);
	}
};
