import { AppwriteNodeService, AppwriteProject } from '$lib/AppwriteNodeService';

export async function load({ cookies, locals }) {
	await AppwriteNodeService.signOut();
	cookies.delete('a_session_' + AppwriteProject, { path: '/' });
	cookies.delete('a_session_' + AppwriteProject + '_legacy', { path: '/' });
	locals.user = undefined;
	return { success: true };
}
