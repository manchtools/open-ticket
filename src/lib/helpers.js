import { toastStore } from '@skeletonlabs/skeleton';

export function handlePocketBaseError({ code, message }) {
	switch (code) {
		case 400:
			toastStore.trigger({ message: message });
			break;
		case 401:
			toastStore.trigger({ message: 'Your session has expired' });
			break;
		case 403:
			toastStore.trigger({ message: 'You are not allowed to perform this action' });
			break;
		case 404:
			toastStore.trigger({ message: 'This resource does not exist' });
			break;
		case 429:
			toastStore.trigger({ message: 'Ratelimit exceded' });
			break;
	}
}

export let drawerBaseSettings = {
	width: 'w-full',
	height: 'max-h-[90%]',
	padding: 'p-6',

	rounded: 'rounded-xl',
	bgDrawer: 'bg-purple-900 text-white',
	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50'
};

export function serializePoJos(data) {
	return JSON.parse(JSON.stringify(data));
}
