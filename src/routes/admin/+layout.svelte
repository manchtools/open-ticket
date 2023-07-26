<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailAnchor href="/admin/tickets" title="tickets">
				<svelte:fragment slot="lead"><i class="fa-solid fa-ticket" /></svelte:fragment>
				<span>Tickets</span>
			</AppRailAnchor>

			<svelte:fragment slot="trail">
				<AppRailAnchor href="/admin/settings" title="settings">
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
