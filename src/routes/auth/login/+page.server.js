import { serializePoJos } from '$lib/helpers';
import { error, fail } from '@sveltejs/kit';
import { Agent, setGlobalDispatcher } from 'undici';

const agent = new Agent({
	connect: {
		rejectUnauthorized: false
	}
});

setGlobalDispatcher(agent);
export const actions = {
	login: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		try {
			const user = await locals.pb.collection('users').authWithPassword(data.email, data.password);
			return serializePoJos(user);
		} catch (e) {
			return fail(e.status, { email: data.email });
		}
	}
};
