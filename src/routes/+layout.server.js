export async function load({ locals }) {
	return { user: locals.user, agents: locals.agents, queues: locals.queues };
}
