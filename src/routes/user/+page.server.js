import { serializePoJos } from '$lib/helpers';

export const actions = {
	updateUser: async ({ request, locals }) => {
		const { id, username, name, email, password, passwordConfirm, oldPassword, agent } =
			Object.fromEntries(await request.formData());
		let payload = {
			email,
			username,
			name
		};
		if (oldPassword && password && passwordConfirm) {
			payload['oldPassword'] = oldPassword;
			payload['password'] = password;
			payload['passwordConfirm'] = passwordConfirm;
		}

		const response = await locals.pb.collection('users').update(id, payload);
		return { response: serializePoJos(response) };
	},
	deleteUser: async ({ locals }) => {
		await locals.pb.collection('users').delete(locals.user.id);
	}
};
