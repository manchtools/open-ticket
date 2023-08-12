import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;

	const tickets = await locals.pb.collection('tickets').getList(offset, 25, {
		sort: '-created',
		expand: 'createdBy,agent'
	});

	return { tickets: serializePoJos(tickets) };
}
