import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;

	const tickets = await locals.pb.collection('tickets').getList(offset, 25, {
		sort: '-created',
		expand: 'replies(ticket),replies(ticket).createdBy,createdBy,agent'
	});

	return { tickets: serializePoJos(tickets) };
}

export const actions = {
	updateTicket: async ({ request, locals }) => {
		const { id, status, agent } = Object.fromEntries(await request.formData());
		const res = await locals.pb.collection('tickets').update(id, { status, agent });
		return serializePoJos(res);
	}
};
