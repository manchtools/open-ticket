import { error, json } from '@sveltejs/kit';
import { setVapidDetails, sendNotification } from 'web-push';
import { env as priv } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';
import { notificationMessage, notificationTitle } from '$lib/helpers';

export async function POST({ request }) {
	const headers = await request.headers;
	if (
		headers.get('origin') === priv.PRIVATE_POCKETBASE_URL &&
		pub.PUBLIC_VAPID !== '' &&
		priv.PRIVATE_VAPID !== ''
	) {
		try {
			setVapidDetails(`mailto:${priv.LETS_ENCRYPT_EMAIL}`, pub.PUBLIC_VAPID, priv.PRIVATE_VAPID);
		} catch (e) {
			throw error(500, 'There was an error setting the vapidkeys');
		}
		const res = await request.json();
		const notificationText = notificationMessage(res.payload);
		const notificationHead = notificationTitle(res.payload);
		try {
			await sendNotification(
				res.subscription,
				JSON.stringify({ message: notificationText, title: notificationHead })
			);
			return json({ success: true });
		} catch (e) {
			if (e.statusCode === 410) {
				return json({ success: false });
			} else {
				return json({ success: true });
			}
		}
	} else {
		throw error(403);
	}
}
