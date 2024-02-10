export async function load({ locals, url }) {
	const users = await locals.pb.collection('users').getList(1, 50, {
		requestKey: 'admin-users',
		filter: "type='user'"
	});
	return {
		users
	};
}
