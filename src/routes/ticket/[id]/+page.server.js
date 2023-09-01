import { serializePoJos } from '$lib/helpers';

export async function load({ params, locals }) {
	const ticket = await locals.pb.collection('tickets').getOne(params.id, {
		expand: 'replies,replies.createdBy,createdBy,agent,queue'
	});
	const fileToken = await locals.pb.files.getToken();
	ticket['fileToken'] = fileToken;
	return { ticket: serializePoJos(ticket) };
}

export const actions = {
	addReply: async ({ request, params, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const res = await locals.pb.collection('replies').create({
			private: data.visability ? true : false,
			body: data.body,
			createdBy: locals.user.id,
			ticket: params.id
		});
		await locals.pb.collection('tickets').update(params.id, { 'replies+': res.id });
		const reply = await locals.pb
			.collection('replies')
			.getOne(res.id, { expand: 'createdBy,ticket' });
		return serializePoJos(reply);
	}
};
