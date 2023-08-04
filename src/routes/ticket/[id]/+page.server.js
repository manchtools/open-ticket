import { serializePoJos } from '$lib/helpers';

export const actions = {
	addReply: async ({ request, params, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const res = await locals.pb.collection('replies').create({
			private: data.visability ? true : false,
			body: data.body,
			createdBy: locals.user.id,
			ticket: params.id
		});
		const reply = await locals.pb
			.collection('replies')
			.getOne(res.id, { expand: 'createdBy,ticket' });
		return serializePoJos(reply);
	}
};
