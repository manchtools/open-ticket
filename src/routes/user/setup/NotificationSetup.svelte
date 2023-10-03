<script>
	import { SlideToggle, Step } from '@skeletonlabs/skeleton';
	import { t } from '$lib/translations/translations';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { pb } from '$lib/db';
	import { page } from '$app/stores';
	let data = $page.data;
	let blockedNotifications = false;
	let supportNotification = true;
	let hasPushSubscripition = false;
	onMount(async () => {
		if ('Notification' in window) {
			blockedNotifications = Notification.permission === 'denied' ? true : false;
			let sw = await navigator.serviceWorker.ready;
			let push = await sw.pushManager.getSubscription();
			if (push) {
				hasPushSubscripition = true;
			}
		} else {
			supportNotification = false;
		}
	});
	async function subscribe() {
		let sw = await navigator.serviceWorker.ready;
		let push = await sw.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: env.PUBLIC_VAPID
		});
		await pb.collection('pushSubscriptions').create({ user: data.user.id, subscription: push });
	}
	async function unsubscribe() {
		let sw = await navigator.serviceWorker.ready;
		await sw.pushManager.getSubscription().then(async (subscription) => {
			try {
				const record = await pb
					.collection('pushSubscriptions')
					.getFirstListItem(`subscription.endpoint="${subscription?.endpoint}"`);
				if (record) {
					await pb.collection('pushSubscriptions').delete(record.id);
				}
			} catch (e) {
				console.log(e);
			} finally {
				subscription?.unsubscribe();
			}
		});
	}
</script>

<Step>
	<svelte:fragment slot="header">{$t('setup.notification.headline')}</svelte:fragment>
	<h4>
		{#if supportNotification}
			{#if blockedNotifications}
				<p class=" text-red-500">
					{$t('setup.notification.deniedBody')}
				</p>
			{:else}
				{$t('setup.notification.allowedBody')}
			{/if}
		{:else}
			{$t('setup.notification.notSupported')}
		{/if}
	</h4>
	{#if env.PUBLIC_VAPID}
		<SlideToggle
			name="pushNotifications"
			active="bg-primary-500"
			size="sm"
			disabled={blockedNotifications}
			bind:checked={hasPushSubscripition}
			on:change={(e) => {
				if (e.target.checked) {
					subscribe();
				}
				if (!e.target.checked) {
					unsubscribe();
				}
			}}>{$t('notifications.recieveOnThisDevice')}</SlideToggle
		>
	{/if}
</Step>
