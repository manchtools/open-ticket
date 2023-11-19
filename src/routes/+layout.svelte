<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Modal, SlideToggle } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
import { initializeStores } from '@skeletonlabs/skeleton';

initializeStores();
	import { storePopup } from '@skeletonlabs/skeleton';

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton';
	import Ticket from '$lib/tickets/Ticket.svelte';
	import CreateUser from '$lib/user/CreateUser.svelte';

	import { popup } from '@skeletonlabs/skeleton';
	import EditUser from '$lib/user/EditUser.svelte';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import CreateQueue from '$lib/queue/CreateQueue.svelte';
	import EditQueue from '$lib/queue/EditQueue.svelte';
	import { faTicket, faUser, faTurnUp, faGear, faBell } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Licenses from './Licenses.svelte';
	import Logo from '$lib/Logo.svelte';
	import { pb } from '$lib/db';
	import { notificationLink, notificationMessage, notifyUser } from '$lib/helpers';
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations/translations';
	export let data;
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let hasPushSubscripition = false;

	let blockedNotifications = false;
	onMount(async () => {
		blockedNotifications =
			env.PUBLIC_VAPID === '' ? true : Notification.permission === 'denied' ? true : false;
		let sw = await navigator.serviceWorker.ready;
		let push = await sw.pushManager.getSubscription();
		if (push) {
			hasPushSubscripition = true;
		}
	});

	$: if (browser && data.user) {
		pb.collection('notifications').subscribe('*', function (e) {
			if (e.action === 'create' || e.action === 'update') {
				notifyUser(e.record);
			}
		});
	}
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
		let push = await sw.pushManager.getSubscription().then(async (subscription) => {
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
	const popupSettings = {
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'userPane',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};
	const notificationPopUp = {
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'notificationPane',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	$: classesActive = (href, fallback = '') =>
		href === $page.url.pathname ? '!variant-ghost-primary' : fallback;

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
</script>

<Modal />
<Drawer position="bottom">
	<div class="p-4">
		{#if $drawerStore?.type === 'ticket'}
			<Ticket data={$drawerStore.data} />
		{/if}
		{#if $drawerStore?.type === 'new_user'}
			<CreateUser />
		{/if}
		{#if $drawerStore?.type === 'user'}
			<EditUser data={$drawerStore.data} />
		{/if}
		{#if $drawerStore?.type === 'new_queue'}
			<CreateQueue />
		{/if}
		{#if $drawerStore?.type === 'queue'}
			<EditQueue data={$drawerStore.data} />
		{/if}
	</div>
</Drawer>
<Toast position="br" />
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		{#if $page.url.pathname.startsWith('/admin')}
			<AppRail>
				<AppRailAnchor
					href="/admin/tickets"
					title="tickets"
					selected={$page.url.pathname === '/admin/tickets'}
				>
					<svelte:fragment slot="lead"><Fa icon={faTicket} /></svelte:fragment>
					<span>Tickets</span>
				</AppRailAnchor>
				<svelte:fragment slot="trail">
					{#if data.user?.type === 'agent'}
						<AppRailAnchor
							href="/admin/settings"
							title="settings"
							selected={$page.url.pathname.startsWith('/admin/settings')}
						>
							<svelte:fragment slot="lead"><Fa icon={faGear} /></svelte:fragment>
							<span>Settings</span>
						</AppRailAnchor>
					{/if}
				</svelte:fragment>
			</AppRail>
		{/if}
		{#if !$page.url.pathname.startsWith('/admin') && data.user}
			<AppRail>
				<AppRailAnchor
					href="/user/tickets"
					title="tickets"
					selected={$page.url.pathname === '/user/tickets'}
				>
					<svelte:fragment slot="lead"><Fa icon={faTicket} /></svelte:fragment>
					<span>My Tickets</span>
				</AppRailAnchor>
			</AppRail>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="header">
		{#if data.user}
			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
				<svelte:fragment slot="lead">
					<a href="/" class="w-6">
						<Logo />
					</a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<button use:popup={notificationPopUp}>
						<Fa icon={faBell} />
					</button>
					<button use:popup={popupSettings}>
						<Fa icon={faUser} />
					</button>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<div class="p-4 h-full w-full">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<hr />
		<div class="w-full flex justify-center p-2">
			<button
				on:click={() => {
					modalStore.trigger({
						type: 'component',
						component: {
							ref: Licenses
						}
					});
				}}
			>
				Licenses
			</button>
		</div>
	</svelte:fragment>
</AppShell>

<nav class="card list p-4 z-[999] shadow-xl" data-popup="userPane">
	<ul class="flex gap-2 flex-col">
		<li>
			<a href="/user" class="btn btn-sm variant-ghost {classesActive('/user')}">My account</a>
		</li>
		<li class="pl-2 flex">
			<Fa icon={faTurnUp} class="rotate-90" />
			<a href="/user/tickets" class="btn btn-sm variant-ghost {classesActive('/user/tickets')}">
				My Tickets</a
			>
		</li>

		{#if data.user?.type.includes('agent')}
			<li>
				<a href="/admin" class="btn btn-sm {classesActive('/admin', 'variant-ghost-warning')}"
					>Admin</a
				>
			</li>
		{/if}
		<li>
			<a href="/auth/logout" class="btn btn-sm variant-ghost-error">Logout</a>
		</li>
	</ul>
</nav>

<div
	class="card list p-4 z-[999] shadow-xl max-h-64 overflow-y-scroll"
	data-popup="notificationPane"
>
	<h2>Notifications</h2>
	{#if env.PUBLIC_VAPID}
		<SlideToggle
			name="pushNotifications"
			active="bg-primary-500"
			size="sm"
			bind:checked={hasPushSubscripition}
			disabled={blockedNotifications}
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

	<div class="flex flex-col gap-2">
		{#each data.notifications || [] as notification}
			<a href={notificationLink(notification.payload)}
				>{notificationMessage(notification.payload)}</a
			>
		{/each}
	</div>
</div>
