import { serializePoJos } from '$lib/helpers';
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
	try {
		const ticket = await locals.pb.collection('tickets').getOne(params.id, {
			expand: 'replies,replies.createdBy,createdBy,agent,queue'
		});
		const fileToken = await locals.pb.files.getToken();
		ticket['fileToken'] = fileToken;
		return { ticket: serializePoJos(ticket) };
	} catch (e) {
		throw redirect(303, '/admin/tickets');
	}
}

export const actions = {
	updateTicket: async ({ params, request, locals }) => {
		let { status, agent, queue } = Object.fromEntries(await request.formData());
		if (agent === 'self') {
			agent = locals.user.id;
		}
		const res = await locals.pb.collection('tickets').update(params.id, { status, agent, queue });
		return serializePoJos(res);
	},
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
	},
	removeAttachment: async ({ request, params, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('tickets').update(params.id, { 'attachments-': [data.fileName] });
		} catch (e) {
			console.log(e);
		}
	}
};
