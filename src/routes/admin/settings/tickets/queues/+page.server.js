import { serializePoJos } from '$lib/helpers';

export async function load({ locals }) {
	try {
		return {
			queues: serializePoJos(
				await locals.pb.collection('queues').getList(0, 25, { expand: 'members' })
			)
		};
	} catch (e) {
		console.log(e);
	}
}

export const actions = {
	addQueue: async ({ locals, request }) => {
		const { name, members } = Object.fromEntries(await request.formData());
		let res;
		try {
			res = await locals.pb.collection('queues').create({ name, members });
		} catch (e) {
			console.log(e);
		}
		return serializePoJos(res);
	},
	updateQueue: async ({ locals, request }) => {
		const { id, name, members } = Object.fromEntries(await request.formData());
		let res;

		try {
			res = await locals.pb.collection('queues').update(id, { name, members });
		} catch (e) {
			console.log(e);
		}
		return serializePoJos(res);
	},
	deleteQueue: async ({ locals, request }) => {
		const { id } = Object.fromEntries(await request.formData());
		let res;
		try {
			res = await locals.pb.collection('queues').delete(id);
		} catch (e) {
			console.log(e);
		}
		return serializePoJos(res);
	}
};
