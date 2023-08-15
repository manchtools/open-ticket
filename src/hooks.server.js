import PocketBase from 'pocketbase';
import { error, redirect } from '@sveltejs/kit';
import { env as priv } from '$env/dynamic/private';
import { serializePoJos } from '$lib/helpers';
import { existsSync, writeFile } from 'node:fs';

export async function handle({ event, resolve }) {
	console.log(
		priv.PRIVATE_POCKETBASE_URL,
		priv.PRIVATE_POCKETBASE_ADMIN,
		priv.PRIVATE_POCKETBASE_PASSWORD,
		event.url.pathname
	);
	if (existsSync('setupDone')) {
		event.locals.pb = new PocketBase(priv.PRIVATE_POCKETBASE_URL);
		event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

		try {
			await event.locals.pb.collection('users').authRefresh();
		} catch (e) {
			if (!event.url.pathname.startsWith('/auth')) {
				event.locals.pb.authStore.clear();
				event.cookies.delete('pb_auth');
				throw redirect(307, '/auth/login');
			}
		}
		if (event.locals.pb.authStore.isValid) {
			event.locals.user = serializePoJos(event.locals.pb.authStore.baseModel);
			event.locals.agents = serializePoJos(
				await event.locals.pb.collection('users').getFullList({ filter: "type='agent'" })
			);
			if (
				event.url.pathname.startsWith('/setup') ||
				event.url.pathname === '/auth/login' ||
				(event.url.pathname.startsWith('/admin') && event.locals.user.type !== 'agent')
			) {
				throw redirect(303, '/');
			}
		}

		const response = await resolve(event);
		response.headers.append(
			'set-cookie',
			event.locals.pb.authStore.exportToCookie({ path: '/', secure: false })
		);
		return response;
	} else {
		const tmpPB = new PocketBase(priv.PRIVATE_POCKETBASE_URL);
		try {
			await tmpPB.admins.authWithPassword(
				priv.PRIVATE_POCKETBASE_ADMIN,
				priv.PRIVATE_POCKETBASE_PASSWORD
			);
		} catch (e) {
			throw error(
				500,
				'Admin user does not exist or credentials are wrong, please check you configuration and reload server'
			);
		}
		try {
			await tmpPB.collection('users').getFirstListItem('type="agent"');
			writeFile('setupDone', '', (err) => {
				if (err) {
					throw error(500, "Can't write setupDone file");
				}
			});
			throw redirect(307, '/');
		} catch (e) {
			if (event.url.pathname !== '/setup') {
				throw redirect(307, '/setup');
			}
		}
		const response = await resolve(event);
		return response;
	}
}
