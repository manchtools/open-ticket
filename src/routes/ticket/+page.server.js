import { serializePoJos } from '$lib/helpers';

export const actions = {
	create: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const res = await locals.pb.collection('tickets').create({
			subject: data.subject || '',
			body: data.body,
			status: 'new',
			createdBy: locals.user.id
		});
		const returnTicket = await locals.pb
			.collection('tickets')
			.getOne(res.id, { expand: 'createdBy,replies,replies.createdBy,agent' });
		return serializePoJos(returnTicket);
	}
};
