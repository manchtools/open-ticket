import {
	Account,
	Avatars,
	Client,
	Teams,
	Databases,
	Query,
	Functions,
	Permission,
	Role
} from 'node-appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import { PRIVATE_APPWRITE_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
export const AppwriteEndpoint = PUBLIC_APPWRITE_ENDPOINT;
export const AppwriteProject = PUBLIC_APPWRITE_PROJECT;

export const client = new Client()
	.setEndpoint(AppwriteEndpoint)
	.setProject(AppwriteProject)
	.setSelfSigned();
const account = new Account(client);
const avatars = new Avatars(client);
const teams = new Teams(client);
const functions = new Functions(client);
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
		return await databases.createDocument(
			'ticketing',
			'tickets',
			'unique()',
			{
				subject,
				body,
				createdBy: account.$id
			},
			[Permission.read(Role.user(account.$id))]
		);
	},
	addReply: async (ticket = '', body = '', user = '', visable = true) => {
		if (body.length <= 0) {
			throw error(400, "Message can't be empty");
		}
		try {
			const singleTicket = await databases.getDocument('ticketing', 'tickets', ticket);

			const reply = await databases.createDocument(
				'ticketing',
				'replies',
				'unique()',
				{
					body,
					ticket,
					createdBy: user,
					public: visable
				},
				[Permission.read(Role.user(user))]
			);
			databases.updateDocument('ticketing', 'tickets', ticket, {
				status: singleTicket.status
			});
			return reply;
		} catch (e) {
			console.log(e);
			return e;
		}
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
