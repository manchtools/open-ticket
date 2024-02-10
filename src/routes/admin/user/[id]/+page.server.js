import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const user = await locals.pb.collection('users').getOne(params.id);
	return {
		form: { user: await superValidate(user, formSchema) }
	};
}

export const actions = {
	updateUser: async ({ locals, params, request }) => {
		const form = await superValidate(await request.formData(), formSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const user = await locals.pb.collection('users').update(params.id, form.data);
	},
	deleteUser: async ({ locals, params }) => {
		const user = await locals.pb.collection('users').getOne(params.id);
		await locals.pb.collection('users').delete(params.id);
		let href = '/admin/user/';
		if (user.type.includes('agent')) {
			href += 'agents';
		}
		if (user.type === 'user') {
			href += 'users';
		}
		throw redirect(303, href);
	}
};
