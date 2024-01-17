import { error } from '@sveltejs/kit';

export async function load({ locals, url }) {
	let deleted = parseInt(url.searchParams.get('deleted')) || 0;

	try {
		const tickets = locals.pb.collection('tickets').getList(1, 25, {
			expand: 'createdBy,queue',
			filter: locals.pb.filter('deleted = {:deleted}', {
				deleted
			})
		});
		return {
			streamed: {
				tickets
			}
		};
	} catch (e) {
		error(500, 'There was an error');
	}
}
