import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	locals.pb.authStore.clear();
	throw redirect(307, '/auth/login');
}
