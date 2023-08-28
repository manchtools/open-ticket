import { env as priv } from '$env/dynamic/private';

export const actions = {
	loggOfEveryone: async ({ locals }) => {
		if (locals.user.type === 'agent') {
			await locals.pb.admins.authWithPassword(
				priv.PRIVATE_POCKETBASE_ADMIN,
				priv.PRIVATE_POCKETBASE_PASSWORD
			);
			await locals.pb.settings.update({
				recordAuthToken: {
					secret: crypto.randomUUID()
				}
			});
		}
	}
};
