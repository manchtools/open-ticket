import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;

	const users = await locals.pb
		.collection('users')
		.getList(offset, 25, { filter: 'type="agent" || type="limited_agent"' });
	return { users: serializePoJos(users) };
}

export const actions = {
	createUser: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const randPass = crypto.randomUUID();
		let payload = {
			email: data.email,
			username: data.username || '',
			type: '',
			emailVisibility: true,
			password: randPass,
			passwordConfirm: randPass
		};
		if (data.agent) {
			payload.type = 'agent';
		}
		if (data.limited_agent) {
			payload.type = 'limited_agent';
		}
		const response = await locals.pb.collection('users').create(payload);

		return { tmpPass: randPass };
	},
	updateUser: async ({ request, locals }) => {
		const { id, username, name, email, password, passwordConfirm, agent, limited_agent } =
			Object.fromEntries(await request.formData());
		let payload = {
			email,
			username,
			name,
			type: ''
		};
		if (passwordConfirm && password) {
			payload['passwordConfirm'] = passwordConfirm;
			payload['password'] = password;
		}
		if (!agent || !limited_agent) {
			(payload.type = 'user'), (payload['emailVisibility'] = false);
		}
		if (limited_agent) {
			payload.type = 'limited_agent';
		}
		if (agent) {
			payload.type = 'agent';
		}

		const response = await locals.pb.collection('users').update(id, payload);
		return { response: serializePoJos(response) };
	},
	deleteUser: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());
		await locals.pb.collection('users').delete(id);
	}
};
