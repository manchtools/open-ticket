import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { serializePoJos } from '$lib/helpers';

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
		event.locals.user = serializePoJos(event.locals.pb.authStore.baseModel);
		event.locals.agents = serializePoJos(
			await event.locals.pb.collection('users').getFullList({ filter: "type='agent'" })
		);
		if (event.route.id.startsWith('/admin') && event.locals.user.type !== 'agent') {
			throw redirect(307, '/');
		}
	} catch (e) {
		event.locals.pb.authStore.clear();
		throw redirect(307, '/auth/logout');
	}

	const response = await resolve(event);
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: false })
	);
	return response;
}
