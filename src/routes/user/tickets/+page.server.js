import { serializePoJos } from '$lib/helpers';

export async function load({ url, locals }) {
	const offset = parseInt(url.searchParams.get('offset')) || 1;
	const searchTerm = url.searchParams.get('search');
	let searchData = {
		sort: '-created',
		expand: 'createdBy,agent',
		filter: `createdBy = "${locals.user.id}"`
	};
	if (searchTerm) {
		searchData[
			'filter'
		] += `&&(body ~ '${searchTerm}'||subject ~ '${searchTerm}'||id = '${searchTerm}'||agent.name ~ '${searchTerm}'||agent.email ~ '${searchTerm}'||createdBy.name ~ '${searchTerm}'||createdBy.email ~ '${searchTerm}')`;
	}
	const tickets = await locals.pb.collection('tickets').getList(offset, 25, searchData);

	return { tickets: serializePoJos(tickets) };
}
