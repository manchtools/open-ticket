import { env as priv } from '$env/dynamic/private';
import PocketBase from 'pocketbase';
import { env as pub } from '$env/dynamic/public';
import { serializePoJos } from '$lib/helpers';
import { error } from '@sveltejs/kit';
export async function load() {
	const tmpPB = new PocketBase(pub.PUBLIC_POCKETBASE_URL);
	await tmpPB.admins.authWithPassword(
		priv.PRIVATE_POCKETBASE_ADMIN,
		priv.PRIVATE_POCKETBASE_PASSWORD
	);
	const settings = await tmpPB.settings.getAll({
		fields:
			'googleAuth,facebookAuth,githubAuth,gitlabAuth,discordAuth,twitterAuth,microsoftAuth,spotifyAuth,twitchAuth,giteeAuth,giteaAuth,oidcAuth,oidc2Auth,oidc3Auth,appleAuth,instagramAuth',
		sort: 'asc'
	});

	return {
		settings: {
			authProvider: serializePoJos(settings)
		}
	};
}

export const actions = {
	updateOauthProvider: async ({ locals, url, request }) => {
		if (locals.user.type === 'agent') {
			const tmpPB = new PocketBase(priv.PUBLIC_POCKETBASE_URL);
			await tmpPB.admins.authWithPassword(
				priv.PRIVATE_POCKETBASE_ADMIN,
				priv.PRIVATE_POCKETBASE_PASSWORD
			);
			const data = Object.fromEntries(await request.formData());
			const queryParams = url.searchParams.get('name');
			const postData = {};
			postData[queryParams] = { enabled: data?.enabled === 'on' ? true : false };
			delete data?.enabled;
			postData[queryParams] = { ...postData[queryParams], ...data };
			await tmpPB.settings.update(postData);
		} else {
			throw error(400, 'Only agents can perform this action');
		}
	}
};
