import { PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { error, fail, redirect } from '@sveltejs/kit';
import { writeFile } from 'node:fs';
export const actions = {
	createAgent: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const tmpPB = new PocketBase(PUBLIC_POCKETBASE_URL);
		if (data.email === '') {
			return fail(400, { error: true, message: "Email can't be empty" });
		}
		if (data.password !== data.passwordConfirm) {
			return fail(400, { error: true, message: 'Passwords dont match', email: data.email });
		}
		if (data.password.length <= 7) {
			return fail(400, {
				error: true,
				message: 'Password has to be at least 8 charakters',
				email: data.email
			});
		}
		try {
			await tmpPB.admins.authWithPassword(PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD);
		} catch (e) {
			throw error(
				500,
				'Admin user does not exist or credentials are wrong, please check you configuration and reload server'
			);
		}
		try {
			await tmpPB.collection('users').create({
				email: data.email,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				type: 'agent',
				emailVidability: true
			});
			writeFile('setupDone', '', (err) => {
				if (err) {
					throw error(500, "Can't write setupDone file");
				}
			});
		} catch (e) {
			throw error(e.status, 'There was an error creating agent user');
		}
		throw redirect(303, '/auth/login');
	}
};
