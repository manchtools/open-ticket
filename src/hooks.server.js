import PocketBase from 'pocketbase';
import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD } from '$env/static/private';
import { serializePoJos } from '$lib/helpers';
import { existsSync, writeFile } from 'node:fs';

export async function handle({ event, resolve }) {
	if (existsSync('setupDone')) {
		event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
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
				event.route.id.startsWith('/setup') ||
				event.route.id === '/auth/login' ||
				(event.route.id.startsWith('/admin') && event.locals.user.type !== 'agent')
			) {
				throw redirect(303, '/');
			}
		}

		const response = await resolve(event);
		response.headers.append(
			'set-cookie',
			event.locals.pb.authStore.exportToCookie({ httpOnly: false })
		);
		return response;
	} else {
		const tmpPB = new PocketBase(PUBLIC_POCKETBASE_URL);
		try {
			await tmpPB.admins.authWithPassword(PRIVATE_POCKETBASE_ADMIN, PRIVATE_POCKETBASE_PASSWORD);
		} catch (e) {
			throw error(400, 'Admin user does not exist');
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
			if (event.route.id !== '/setup') {
				throw redirect(307, '/setup');
			}
		}
		const response = await resolve(event);
		return response;
	}
}
