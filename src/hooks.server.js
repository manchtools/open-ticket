import { AppwriteProject, AppwriteNodeService } from '$lib/AppwriteNodeService';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
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
		} catch (e) {
			event.cookies.delete('a_session_' + AppwriteProject, { path: '/' });
			event.cookies.delete('a_session_' + AppwriteProject + '_legacy', { path: '/' });
			throw redirect(307, '/auth/login');
		}
	}
	const response = await resolve(event);
	return response;
}
