import { Account, Avatars, Client, Teams, Storage, Databases, Functions, Query } from 'appwrite';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import { handleAppwriteError, parseString, splitCookiesString } from './helpers';
import { goto } from '$app/navigation';

export const AppwriteEndpoint = PUBLIC_APPWRITE_ENDPOINT;
export const AppwriteProject = PUBLIC_APPWRITE_PROJECT;

export const client = new Client().setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);
const account = new Account(client);
const avatars = new Avatars(client);
const teams = new Teams(client);
const storage = new Storage(client);
const databases = new Databases(client);
const functions = new Functions(client);

export const AppwriteService = {
	signOut: async () => {
		await account.deleteSession('current');
	},
	signIn: async (email, password) => {
		try {
			return await account.createEmailSession(email, password);
		} catch (e) {
			console.log(e);
		}
	},
	getAccount: async () => {
		try {
			return await account.get();
		} catch (e) {
			handleAppwriteError(e);
		}
	},

	replyToTicket: async (ticketId, reply) => {
		if (reply.length === 0) {
			return { error: true, message: 'Cant send empty message' };
		}
		try {
			const ticket = await databases.getDocument('ticketing', 'tickets', ticketId);
			let ticketReplyIds = [];
			ticket.replies.forEach((reply) => {
				ticketReplyIds.push(reply.$id);
			});
			const newReply = await databases.createDocument('ticketing', 'replies', 'unique()', {
				body: reply,
				createdBy: get(page).data.user.$id
			});

			ticketReplyIds.push(newReply.$id);

			const updatedTicket = await databases.updateDocument('ticketing', 'tickets', ticket.$id, {
				replies: ticketReplyIds
			});
			return { error: false, message: 'success', ticket: updatedTicket };
		} catch (e) {
			return { error: true, message: 'you dont have permissions to view this document' };
		}
	},
	setSession: () => {
		const authCookies = {};
		const cookiesArray = splitCookiesString(document.cookie, ';');
		const cookiesParsed = cookiesArray.map((cookie) => parseString(cookie));

		cookiesParsed.map((cookie) => {
			if (cookie.name === 'a_session_' + AppwriteProject) {
				authCookies[cookie.name] = cookie.value;
			}
		});
		if (authCookies[`a_session_${AppwriteProject}`]) {
			client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);
			localStorage.setItem('cookieFallback', JSON.stringify(authCookies));
		} else {
			goto('/auth/logout');
		}
	}
};
