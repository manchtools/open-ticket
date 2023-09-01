<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Modal } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Ticket from '$lib/tickets/Ticket.svelte';
	import CreateUser from '$lib/user/CreateUser.svelte';

	import { popup } from '@skeletonlabs/skeleton';
	import EditUser from '$lib/user/EditUser.svelte';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import CreateQueue from '$lib/queue/CreateQueue.svelte';
	import EditQueue from '$lib/queue/EditQueue.svelte';
	import { faTicket, faUser, faArrowTurnRight, faGear } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Licenses from './Licenses.svelte';

	export let data;

	const popupSettings = {
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'userPane',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	$: classesActive = (href, fallback = '') =>
		href === $page.url.pathname ? '!variant-ghost-primary' : fallback;
</script>

<Modal />
<Drawer position="bottom">
	<div class="p-4">
		{#if $drawerStore.type === 'ticket'}
			<Ticket data={$drawerStore.data} />
		{/if}
		{#if $drawerStore.type === 'new_user'}
			<CreateUser />
		{/if}
		{#if $drawerStore.type === 'user'}
			<EditUser data={$drawerStore.data} />
		{/if}
		{#if $drawerStore.type === 'new_queue'}
			<CreateQueue />
		{/if}
		{#if $drawerStore.type === 'queue'}
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
					<AppRailAnchor
						href="/admin/settings"
						title="settings"
						selected={$page.url.pathname.startsWith('/admin/settings')}
					>
						<svelte:fragment slot="lead"><Fa icon={faGear} /></svelte:fragment>
						<span>Settings</span>
					</AppRailAnchor>
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
					<a href="/">
						<Fa icon={faTicket} />
					</a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
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
	<!-- (optionally you can provide a label here) -->
	<ul class="flex gap-2 flex-col">
		<li>
			<a href="/user" class="btn btn-sm variant-ghost {classesActive('/user')}">My account</a>
		</li>
		<li class="pl-2 flex">
			<Fa icon={faArrowTurnRight} />
			<a href="/user/tickets" class="btn btn-sm variant-ghost {classesActive('/user/tickets')}">
				My Tickets</a
			>
		</li>

		{#if data.user?.type === 'agent'}
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
