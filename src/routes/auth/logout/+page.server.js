import { AppwriteNodeService, AppwriteProject } from '$lib/AppwriteNodeService';

export async function load({ cookies, locals }) {
	await AppwriteNodeService.signOut();
	await cookies.delete('a_session_' + AppwriteProject, {
		secure: false,
		sameSite: 'Strict',
		path: '/',
		httpOnly: false
	});
	await cookies.delete('a_session_' + AppwriteProject + '_legacy', {
		secure: false,
		sameSite: 'Strict',
		path: '/',
		httpOnly: false
	});
	locals.user = undefined;
	console.log(cookies.getAll());
	return { success: true };
}
