import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;
	const searchTerm = url.searchParams.get('search');
	const queue = url.searchParams.get('queue');

	let searchData = {
		sort: '-created',
		expand: 'createdBy,agent,queue',
		filter: ''
	};
	if (searchTerm) {
		searchData[
			'filter'
		] = `body ~ '${searchTerm}'||subject ~ '${searchTerm}'||id = '${searchTerm}'||agent.name ~ '${searchTerm}'||agent.email ~ '${searchTerm}'||createdBy.name ~ '${searchTerm}'||createdBy.email ~ '${searchTerm}'`;
	}
	if (searchTerm & queue) {
		searchData['filter'] += `&&`;
	}
	if (queue) {
		searchData['filter'] += `queue.id = '${queue}'`;
	}
	console.log(searchData);
	const tickets = await locals.pb.collection('tickets').getList(offset, 25, searchData);
	return { tickets: serializePoJos(tickets) };
}
