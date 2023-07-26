import { AppwriteNodeService } from '$lib/AppwriteNodeService';

export const actions = {
	addReply: async ({ request, params, locals }) => {
		const data = Object.fromEntries(await request.formData());

		const res = await AppwriteNodeService.addReply(
			params.id,
			data.body,
			locals.user.$id,
			data.visability ? false : true
		);
		return res;
	}
};
