import { serializePoJos } from '$lib/helpers';

export async function load({ locals }) {
	const tickets = await locals.pb.collection('tickets').getFullList({
		expand: 'replies,replies.createdBy,createdBy,agent',
		filter: `createdBy = "${locals.user.id}"`,
		sort: '-created'
	});

	return { tickets: serializePoJos(tickets) };
}
