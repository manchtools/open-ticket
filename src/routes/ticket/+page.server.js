import { serializePoJos } from '$lib/helpers';
import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const res = await locals.pb.collection('tickets').create({
			subject: data.subject || '',
			body: data.body,
			status: 'new',
			createdBy: locals.user.id
		});

		throw redirect(303, `/ticket/${res.id}`);
	}
};
