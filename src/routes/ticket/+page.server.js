import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		if (data.getAll('attachments').length === 1 && data.getAll('attachments')[0].size === 0) {
			data.delete('attachments');
		}
		data.append('status', 'new');
		data.append('createdBy', locals.user.id);
		const res = await locals.pb.collection('tickets').create(data);

		throw redirect(303, `/ticket/${res.id}`);
	}
};
