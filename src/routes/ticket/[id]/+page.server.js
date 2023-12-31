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
		const data = await request.formData();
		if (data.getAll('attachments').length === 1 && data.getAll('attachments')[0].size === 0) {
			data.delete('attachments');
		}
		data.append('private', data.get('visability') ? true : false);
		data.append('createdBy', locals.user.id);
		data.append('ticket', params.id);
		const res = await locals.pb.collection('replies').create(data);
		await locals.pb.collection('tickets').update(params.id, { 'replies+': res.id });
		const reply = await locals.pb
			.collection('replies')
			.getOne(res.id, { expand: 'createdBy,ticket' });
		return serializePoJos(reply);
	}
};
