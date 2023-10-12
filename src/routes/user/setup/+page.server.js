import { redirect } from '@sveltejs/kit';

export const actions = {
	updatePassword: async ({ request, locals }) => {
		let { password, passwordConfirm, oldPassword } = Object.fromEntries(await request.formData());

		let payload = {};
		if (oldPassword && password && passwordConfirm) {
			payload['oldPassword'] = oldPassword;
			payload['password'] = password;
			payload['passwordConfirm'] = passwordConfirm;
			payload['setupSteps'] = { ...locals.user.setupSteps, passwordChange: true };
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, payload);
		} catch (e) {
			return { success: false, data: e.response.data };
		}
		throw redirect(303, '/auth/logout');
	}
};
