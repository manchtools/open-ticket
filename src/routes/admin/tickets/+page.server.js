import { serializePoJos } from '$lib/helpers';

export async function load({ locals }) {
	const tickets = await locals.pb.collection('tickets').getFullList({
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
