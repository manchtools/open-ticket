import PocketBase from 'pocketbase';
import { env as pub } from '$env/dynamic/public';
import { browser } from '$app/environment';

export const pb = new PocketBase(pub.PUBLIC_POCKETBASE_URL);

if (browser) {
	pb.authStore.loadFromCookie(document.cookie);

	pb.authStore.onChange(() => {
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
	});
}
export default pb;

export function parsePojo(pojo) {
	return JSON.parse(JSON.stringify(pojo));
}

export function pocketBaseFilter() {}
