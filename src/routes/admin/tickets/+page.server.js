import { AppwriteNodeAgentService } from '$lib/AppwriteNodeService';

export async function load() {
	const tickets = await AppwriteNodeAgentService.getOpenTickets();
	console.log(tickets);
	return { tickets };
}
