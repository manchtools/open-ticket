import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const actions = {
	createUser: async ({ locals, request }) => {
		const form = await superValidate(await request.formData(), formSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		form.data['passwordConfirm'] = form.data.password;
		const user = await locals.pb.collection('users').create(form.data);
	}
};
