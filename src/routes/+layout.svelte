<script>
	import { page } from '$app/stores';
	import { account } from '$lib/appwrite';
	import AppShell from '$lib/components/ui/appShell/AppShell.svelte';
	import '../app.pcss';
	export let data;
	console.log(data);
</script>

<AppShell>
	<svelte:fragment slot="header">{data.user ? data.user.name : ''}</svelte:fragment>
	<slot />
</AppShell>
