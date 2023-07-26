<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Ticket from '$lib/tickets/Ticket.svelte';
	export let data;
</script>

<Drawer position="bottom">
	{#if $drawerStore.ticket}
		<Ticket data={$drawerStore.ticket} />
	{/if}
</Drawer>
<Toast position="br" />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-2" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="trail">
				{#if data.user}
					<a href="/admin">Admin</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="h-full w-full">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>
