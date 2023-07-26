import { AppwriteNodeAgentService } from '$lib/AppwriteNodeService';

export async function load() {
	const tickets = await AppwriteNodeAgentService.getOpenTickets();

	return { tickets };
}
