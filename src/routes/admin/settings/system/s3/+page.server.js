import { env as priv } from '$env/dynamic/private';
import PocketBase from 'pocketbase';
import { error } from '@sveltejs/kit';
import { serializePoJos } from '$lib/helpers';

export async function load({ locals }) {
	if (locals.user.type === 'agent') {
		const tmpPB = new PocketBase(priv.PRIVATE_POCKETBASE_URL);
		await tmpPB.admins.authWithPassword(
			priv.PRIVATE_POCKETBASE_ADMIN,
			priv.PRIVATE_POCKETBASE_PASSWORD
		);
		let s3Connection = false;
		try {
			await tmpPB.settings.testS3('storage');
			s3Connection = true;
		} catch (e) {
			s3Connection = false;
		}
		return {
			s3: serializePoJos(await tmpPB.settings.getAll({ fields: 's3' })).s3,
			s3Connection
		};
	} else {
		throw error(400, 'Only agents can perform this action');
	}
}

export const actions = {
	updateBucket: async ({ request, locals }) => {
		if (locals.user.type === 'agent') {
			const tmpPB = new PocketBase(priv.PRIVATE_POCKETBASE_URL);
			await tmpPB.admins.authWithPassword(
				priv.PRIVATE_POCKETBASE_ADMIN,
				priv.PRIVATE_POCKETBASE_PASSWORD
			);
			const data = Object.fromEntries(await request.formData());
			data.enabled = data.enabled ? true : false;
			data.forcePathStyle = data.forcePathStyle ? true : false;
			if (data.secret === '******') {
				delete data.secret;
			}

			await tmpPB.settings.update({ s3: { ...data } });
		} else {
			throw error(400, 'Only agents can perform this action');
		}
	}
};
