import { parsePojo } from '$lib';

export async function load({ locals }) {
	const queues = await locals.pb.collection('queues').getFullList({ expand: 'members' });
	const agents = await locals.pb
		.collection('users')
		.getFullList({ filter: "type='agent'||type='limitedAgent'" });

	return {
		user: locals.user,
		queues: parsePojo(queues),
		agents: parsePojo(agents)
	};
}
