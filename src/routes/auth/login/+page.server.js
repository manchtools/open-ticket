import { superValidate, setError } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
	const authMethods = await locals.pb.collection('users').listAuthMethods();

	return {
		form: await superValidate(formSchema),
		streamed: {
			authMethods
		}
	};
}
export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(await request.formData(), formSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(form.data.account, form.data.password);
			throw redirect(307, '/');
		} catch (e) {
			if (e.status === 307) {
				throw e;
			} else {
				setError(form, 'account', e.response.message);
				setError(form, 'password', e.response.message);
			}
		}
		return {
			form
		};
	}
};
