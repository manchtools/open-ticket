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
			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}
};
