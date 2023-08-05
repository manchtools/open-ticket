import { PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';
import { writeFile } from 'node:fs';
export const actions = {
	createAgent: async ({ request }) => {
		try {
			const tmpPB = new PocketBase(PUBLIC_POCKETBASE_URL);
			const data = Object.fromEntries(await request.formData());
			console.log(data);
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
			throw redirect(303, '/auth/login');
		} catch (e) {
			if (e.constructor.name === 'Redirect') {
				throw e;
			} else {
				throw error(400, 'Admin user does not exist');
			}
		}
	}
};
