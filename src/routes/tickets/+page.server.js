export async function load({ locals }) {
	const tickets = locals.pb.collection('tickets').getList(1, 25, { expand: 'createdBy,queue' });
	return {
		streamed: {
			tickets
		}
	};
}
