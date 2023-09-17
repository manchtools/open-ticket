import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { toastStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import { t } from './translations/translations';

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

export function notifyUser(notification) {
	const { payload } = notification;
	let message = notificationMessage(payload);

	const gotoSrting = notificationLink(payload);

	let action = {
		label: 'Open',
		response: () => goto(gotoSrting)
	};
	toastStore.trigger({ message, action });
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

export function notificationLink(payload) {
	let gotoSrting = '/';
	if (payload.resourceType === 'ticket') {
		if (get(page).data.user.type === 'agent' || get(page).data.user.type === 'limited_agent') {
			gotoSrting += `admin/tickets/${payload.resource.id}/`;
		} else {
			gotoSrting += `ticket/${payload.resource.id}/`;
		}
	}
	if (payload.resourceType === 'reply') {
		if (get(page).data.user.type === 'agent' || get(page).data.user.type === 'limited_agent') {
			gotoSrting += `admin/tickets/${payload.resource.ticket}/`;
		} else {
			gotoSrting += `ticket/${payload.resource.id}/`;
		}
	}
	if (payload.resourceType === 'queue') {
		if (get(page).data.user.type === 'agent' || get(page).data.user.type === 'limited_agent') {
			gotoSrting += `admin/settings/tickets/queues/`;
		}
	}

	return gotoSrting;
}

export function notificationMessage(payload) {
	if (payload.resourceType === 'ticket' && payload.action === 'created') {
		return t.get('notifications.newTicket', {
			ticketId: payload.resource.id,
			trigger: payload.trigger
		});
	}
	if (payload.resourceType === 'reply' && payload.action === 'created') {
		return t.get('notifications.newReply', {
			ticketId: payload.resource.id,
			trigger: payload.trigger
		});
	}
	if (payload.resourceType === 'queue' && payload.action === 'created') {
		return t.get('notifications.newQueue', {
			queueName: payload.resource.name,
			trigger: payload.trigger
		});
	}
	if (payload.resourceType === 'ticket' && payload.action === 'updated') {
		return t.get('notifications.updateTicket', {
			ticketId: payload.resource.id,
			trigger: payload.trigger
		});
	}
	if (payload.resourceType === 'reply' && payload.action === 'updated') {
		return t.get('notifications.updateReply', {
			ticketId: payload.resource.id,
			trigger: payload.trigger
		});
	}
	if (payload.resourceType === 'queue' && payload.action === 'updated') {
		return t.get('notifications.updateQueue', {
			queueName: payload.resource.name,
			trigger: payload.trigger
		});
	}
}
