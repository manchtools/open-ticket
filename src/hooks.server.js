import PocketBase from 'pocketbase';
import { error, redirect } from '@sveltejs/kit';
import { env as priv } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';
import { parsePojo } from '$lib/index';
import { existsSync, writeFile } from 'node:fs';

export async function handle({ event, resolve }) {
	if (existsSync('setupDone')) {
		event.locals.pb = new PocketBase(pub.PUBLIC_POCKETBASE_URL);
		event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

		try {
			await event.locals.pb.collection('users').authRefresh();
		} catch (e) {
			if (!event.url.pathname.startsWith('/auth') && !event.url.pathname.startsWith('/push')) {
				event.locals.pb.authStore.clear();
				event.cookies.delete('pb_auth', { path: '/' });
				throw redirect(307, '/auth/logout');
			}
		}
		if (event.locals.pb.authStore.isValid) {
			event.locals.user = parsePojo(event.locals.pb.authStore.baseModel);
			try {
				event.locals.agents = parsePojo(
					await event.locals.pb
						.collection('users')
						.getFullList({ filter: "type='agent'||type='limited_agent'" })
				);
			} catch (e) {
				console.log(e);
			}
			try {
				event.locals.queues = parsePojo(await event.locals.pb.collection('queues').getFullList());
			} catch (e) {
				console.log(e);
			}
			try {
				event.locals.notifications = parsePojo(
					await event.locals.pb.collection('notifications').getList(1, 20)
				);
			} catch (e) {
				console.log(e);
			}
			if (
				event.url.pathname.startsWith('/admin/settings') &&
				event.locals.user.type === 'limited_agent'
			) {
				throw redirect(303, '/admin');
			}
			if (
				event.url.pathname.startsWith('/setup') ||
				event.url.pathname === '/auth/login' ||
				(event.url.pathname.startsWith('/admin') &&
					event.locals.user.type !== 'agent' &&
					event.locals.user.type !== 'limited_agent')
			) {
				throw redirect(303, '/');
			}
			// if (
			// 	event.locals.user.setupSteps !== null &&
			// 	Object.keys(event.locals.user.setupSteps).some((k) => !event.locals.user.setupSteps[k]) &&
			// 	event.url.pathname !== '/user/setup' &&
			// 	event.url.pathname !== '/auth/logout'
			// ) {
			// 	throw redirect(307, '/user/setup');
			// }
		}

		const response = await resolve(event);
		response.headers.append(
			'set-cookie',
			event.locals.pb.authStore.exportToCookie({ path: '/', httpOnly: false })
		);
		return response;
	} else {
		const tmpPB = new PocketBase(pub.PUBLIC_POCKETBASE_URL);
		try {
			await tmpPB.admins.authWithPassword(
				priv.PRIVATE_POCKETBASE_ADMIN,
				priv.PRIVATE_POCKETBASE_PASSWORD
			);
		} catch (e) {
			throw error(
				500,
				'Admin user does not exist, credentials are wrong or URL is invalid, please check you configuration and reload server'
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
