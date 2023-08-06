import { serializePoJos } from '$lib/helpers';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	try {
		const authPrividers = await locals.pb.collection('users').listAuthMethods();

		return serializePoJos({ authMethods: authPrividers });
	} catch (e) {
		console.log(e);
	}
}

export const actions = {
	login: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		if (data.email === '') {
			return fail(400, { error: true, message: "Email can't be empty" });
		}
		try {
			const user = await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			return fail(e.status, {
				email: data.email,
				message: 'Invalid email or password',
				error: true
			});
		}
		throw redirect(303, '/');
	},
	loginOauth: async ({ url, params }) => {
		console.log(url.searchParams.get('provider'));
	}
};
