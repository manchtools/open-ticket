import { PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { error, fail, redirect } from '@sveltejs/kit';
import { writeFile } from 'node:fs';
export const actions = {
	createAgent: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const tmpPB = new PocketBase(PUBLIC_POCKETBASE_URL);
		if (data.password !== data.passwordConfirm) {
			return fail(400, { error: true, message: 'Passwords dont match' });
		}
		if (data.password.length !== 8) {
			return fail(400, { error: true, message: 'Password has to be at least 8 charakters' });
		}
		try {
			await tmpPB.admins.authWithPassword(PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD);
			await tmpPB.collection('users').create({
				email: data.email,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				type: 'agent'
			});
			writeFile('setupDone', '', (err) => {
				if (err) {
					throw error(500, "Can't write setupDone file");
				}
			});
		} catch (e) {
			throw error(400, 'Admin user does not exist');
		}
		throw redirect(303, '/auth/login');
	}
};
