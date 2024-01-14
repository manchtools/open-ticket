import { parsePojo } from '$lib';
import { superValidate } from 'sveltekit-superforms/server';
import { headSchema, bodySchema, replySchema } from '$lib/components/ui/ticket/ticketSchema';
import { fail } from '@sveltejs/kit';
export async function load({ locals, params }) {
	let ticket = await locals.pb.collection('tickets').getOne(params.id, {
		expand: 'createdBy,updatedBy,agent,queue,replies(ticket),replies(ticket).createdBy'
	});

	return {
		ticket: parsePojo(ticket),
		form: {
			head: await superValidate(ticket, headSchema),
			body: await superValidate(ticket, bodySchema),
			reply: await superValidate(replySchema)
		}
	};
}

export const actions = {
	updateTicketHead: async ({ request, params, locals }) => {
		const form = await superValidate(await request.formData(), headSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await locals.pb.collection('tickets').update(params.id, form.data);
		return {
			form
		};
	},
	updateTicketBody: async ({ request, params, locals }) => {
		const form = await superValidate(await request.formData(), bodySchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await locals.pb.collection('tickets').update(params.id, form.data);
		return {
			form
		};
	},
	addReply: async ({ request, params, locals }) => {
		const form = await superValidate(await request.formData(), replySchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		form.data.ticket = params.id;
		await locals.pb.collection('replies').create(form.data);
		return {
			form
		};
	}
};
