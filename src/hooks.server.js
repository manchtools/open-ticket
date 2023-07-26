import { AppwriteProject, AppwriteNodeService, AppwriteEndpoint } from '$lib/AppwriteNodeService';
import { redirect } from '@sveltejs/kit';
import { PRIVATE_APPWRITE_API_KEY } from '$env/static/private';
import { Health, Client } from 'node-appwrite';
const client = new Client()
	.setEndpoint(AppwriteEndpoint)
	.setProject(AppwriteProject)
	.setKey(PRIVATE_APPWRITE_API_KEY)
	.setSelfSigned();
const health = new Health(client);
export async function handle({ event, resolve }) {
	// try {
	// 	console.log(await health.getDB());
	// } catch (e) {
	// 	if (event.route.id !== '/setup') {
	// 		throw redirect(307, '/setup');
	// 	}
	// }

	const cookieString =
		event.cookies.get('a_session_' + AppwriteProject) ||
		event.cookies.get('a_session_' + AppwriteProject + '_legacy') ||
		'';

	if (cookieString === '') {
		if (event.route.id !== '/auth/login') {
			throw redirect(307, '/auth/login');
		}
	} else {
		AppwriteNodeService.setSession(cookieString);
		try {
			event.locals.user = await AppwriteNodeService.getAccount();
			event.locals.agents = await AppwriteNodeService.getAgents();
		} catch (e) {
			event.cookies.delete('a_session_' + AppwriteProject, { path: '/' });
			event.cookies.delete('a_session_' + AppwriteProject + '_legacy', { path: '/' });
			throw redirect(307, '/auth/logout');
		}
	}
	const response = await resolve(event);
	return response;
}
