export async function load({ locals }) {
	const agents = await locals.pb.collection('users').getList(1, 50, {
		requestKey: 'admin-users-agents',
		filter: 'type="agent"||type="limited_agent"'
	});
	return {
		agents
	};
}
