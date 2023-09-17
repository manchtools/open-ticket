import { redirect } from '@sveltejs/kit';

export const actions = {
	updateUser: async ({ request, locals }) => {
		let { id, username, name, email, password, passwordConfirm, oldPassword, notificationPrefs } =
			Object.fromEntries(await request.formData());
		notificationPrefs = notificationPrefs.split(',');

		let payload = {
			email,
			name,
			notificationPrefs
		};
		if (oldPassword && password && passwordConfirm) {
			payload['oldPassword'] = oldPassword;
			payload['password'] = password;
			payload['passwordConfirm'] = passwordConfirm;
		}

		await locals.pb.collection('users').update(id, payload);
		if (oldPassword && password && passwordConfirm) {
			throw redirect(303, '/auth/logout');
		}
	}
};
