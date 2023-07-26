import { AppwriteNodeService } from '$lib/AppwriteNodeService';

export const actions = {
	create: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const res = await AppwriteNodeService.createTicket(data.subject, data.body);

		return res;
	}
};
