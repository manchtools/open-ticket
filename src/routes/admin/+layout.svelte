<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailAnchor
				href="/admin/tickets"
				title="tickets"
				selected={$page.url.pathname === '/admin/tickets'}
			>
				<svelte:fragment slot="lead"><i class="fa-solid fa-ticket" /></svelte:fragment>
				<span>Tickets</span>
			</AppRailAnchor>

			<svelte:fragment slot="trail">
				<AppRailAnchor
					href="/admin/settings"
					title="settings"
					selected={$page.url.pathname.startsWith('/admin/settings')}
				>
					<svelte:fragment slot="lead"><i class="fa-solid fa-gear" /></svelte:fragment>
					<span>Settings</span>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<div class="p-4">
		<slot />
	</div>
</AppShell>
