/// <reference types="@sveltejs/kit" />
import { files } from '$service-worker';

self.addEventListener('push', async (event) => {
	const payload = event.data.json();
	self.registration.showNotification(payload.title, {
		body: payload.message,
		icon: files[1]
	});
});
