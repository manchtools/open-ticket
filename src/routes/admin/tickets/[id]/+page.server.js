import { serializePoJos } from '$lib/helpers';

export async function load({ params, locals }) {
	const ticket = await locals.pb.collection('tickets').getOne(params.id, {
		expand: 'replies,replies.createdBy,createdBy,agent'
	});

	return { ticket: serializePoJos(ticket) };
}

export const actions = {
	updateTicket: async ({ params, request, locals }) => {
		let { status, agent } = Object.fromEntries(await request.formData());
		if (agent === 'self') {
			agent = locals.user.id;
		}
		const res = await locals.pb
			.collection('tickets')
			.update(params.id, { status, agent, updatedBy: locals.user.id });
		return serializePoJos(res);
	}
};
