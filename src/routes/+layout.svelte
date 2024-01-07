<script>
	import AppShell from '$lib/components/ui/appshell/appshell.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import '../app.pcss';
</script>

<Toaster richColors />
<AppShell>
	<slot />
</AppShell>
