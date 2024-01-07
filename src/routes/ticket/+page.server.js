import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({}) {
	return {
		form: await superValidate(formSchema)
	};
}

export const actions = {
	createTicket: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, formSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			const ticket = await locals.pb.collection('tickets').create(formData);
			redirect(303, `/ticket/${ticket.id}`);
		} catch (e) {
			if (e.status === 303) {
				throw e;
			} else {
				throw error(e.status, e.response);
			}
		}
	}
};
