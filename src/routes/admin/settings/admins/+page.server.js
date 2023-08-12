import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;

	const users = await locals.pb
		.collection('users')
		.getList(offset, 25, { filter: 'type = "agent"' });
	return { users: serializePoJos(users) };
}

export const actions = {
	createUser: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const randPass = crypto.randomUUID();

		const response = await locals.pb.collection('users').create({
			email: data.email,
			username: data.username || '',
			type: 'agent',
			emailVisibility: true,
			password: randPass,
			passwordConfirm: randPass
		});

		return { tmpPass: randPass };
	},
	updateUser: async ({ request, locals }) => {
		const { id, username, name, email, password, passwordConfirm, agent } = Object.fromEntries(
			await request.formData()
		);
		let payload = {
			email,
			username,
			name,
			type: 'agent'
		};
		if (passwordConfirm && password) {
			payload['passwordConfirm'] = passwordConfirm;
			payload['password'] = password;
		}
		if (!agent) {
			(payload.type = 'user'), (payload['emailVisibility'] = false);
		}

		const response = await locals.pb.collection('users').update(id, payload);
		return { response: serializePoJos(response) };
	},
	deleteUser: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());
		await locals.pb.collection('users').delete(id);
	}
};
