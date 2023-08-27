import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;
	const searchTerm = url.searchParams.get('search');
	const queue = url.searchParams.get('queue');
	const status = url.searchParams.get('status');
	let searchData = {
		sort: '-created',
		expand: 'createdBy,agent,queue',
		filter: ''
	};
	if (searchTerm) {
		if (searchData['filter'].length > 0) {
			searchData['filter'] += '&&';
		}
		searchData[
			'filter'
		] += `(body ~ '${searchTerm}'||subject ~ '${searchTerm}'||id = '${searchTerm}'||agent.name ~ '${searchTerm}'||agent.email ~ '${searchTerm}'||createdBy.name ~ '${searchTerm}'||createdBy.email ~ '${searchTerm}'||queue.name ~ '${searchTerm}'||status ~ '${searchTerm}')`;
	}
	if (queue) {
		if (searchData['filter'].length > 0) {
			searchData['filter'] += '&&';
		}
		searchData['filter'] += `queue.id = '${queue}'`;
	}
	if (status) {
		if (searchData['filter'].length > 0) {
			searchData['filter'] += '&&';
		}
		searchData['filter'] += `status = '${status}'`;
	}
	try {
		const tickets = await locals.pb.collection('tickets').getList(offset, 25, searchData);
		return { tickets: serializePoJos(tickets) };
	} catch (e) {
		console.log(e);
	}
}
