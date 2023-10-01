import { json } from '@sveltejs/kit';
import { setVapidDetails, sendNotification } from 'web-push';
import { env as priv } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';
import { notificationMessage, notificationTitle } from '$lib/helpers';

export async function POST({ request }) {
	setVapidDetails('mailto:example@yourdomain.org', pub.PUBLIC_VAPID, priv.PRIVATE_VAPID);
	const res = await request.json();
	const notificationText = notificationMessage(res.payload);
	const notificationHead = notificationTitle(res.payload);
	const notification = await sendNotification(
		res.subscription,
		JSON.stringify({ message: notificationText, title: notificationHead })
	);
	// console.log(notification);
	return json({ success: true });
}
