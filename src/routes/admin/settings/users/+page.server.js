import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;

	const users = await locals.pb
		.collection('users')
		.getList(offset, 25, { filter: 'type = "user"' });
	return { users: serializePoJos(users) };
}

export const actions = {
	createUser: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const randPass = crypto.randomUUID();

		const response = await locals.pb.collection('users').create({
			email: data.email,
			username: data.username || '',
			type: 'user',
			password: randPass,
			passwordConfirm: randPass
		});
		return { tmpPass: randPass };
	},
	updateUser: async ({ request, locals }) => {
		const { id, username, name, email, password, oldPassword, agent } = Object.fromEntries(
			await request.formData()
		);
		let payload = {
			email,
			username,
			name,
			type: 'user'
		};
		if (oldPassword && password) {
			payload['oldPassword'] = oldPassword;
			payload['password'] = password;
			payload['passwordConfirm'] = passwordConfirm;
		}
		if (agent) {
			(payload.type = 'agent'), (payload['emailVisability'] = true);
		}

		const response = await locals.pb.collection('users').update(id, payload);
		return { response: serializePoJos(response) };
	},
	deleteUser: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());
		await locals.pb.collection('users').delete(id);
	}
};
