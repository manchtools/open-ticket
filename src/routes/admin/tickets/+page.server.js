import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;
	const searchTerm = url.searchParams.get('search');
	const queue = url.searchParams.get('queue');
	console.log(searchTerm, queue);
	let searchData = {
		sort: '-created',
		expand: 'createdBy,agent,queue',
		filter: ''
	};
	if (searchTerm && queue) {
		searchData[
			'filter'
		] = `(body ~ '${searchTerm}'||subject ~ '${searchTerm}'||id = '${searchTerm}'||agent.name ~ '${searchTerm}'||agent.email ~ '${searchTerm}'||createdBy.name ~ '${searchTerm}'||createdBy.email ~ '${searchTerm}')&&queue.id = '${queue}'`;
	} else {
		if (searchTerm) {
			searchData[
				'filter'
			] = `body ~ '${searchTerm}'||subject ~ '${searchTerm}'||id = '${searchTerm}'||agent.name ~ '${searchTerm}'||agent.email ~ '${searchTerm}'||createdBy.name ~ '${searchTerm}'||createdBy.email ~ '${searchTerm}'`;
		}

		if (queue) {
			searchData['filter'] = `queue.id = '${queue}'`;
		}
	}
	console.log(searchData);
	try {
		const tickets = await locals.pb.collection('tickets').getList(offset, 25, searchData);
		return { tickets: serializePoJos(tickets) };
	} catch (e) {}
}
