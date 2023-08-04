<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/db';
	import { onMount } from 'svelte';

	onMount(async () => {
		pb.authStore.clear();
		goto('/auth/login', { invalidateAll: true });
	});
</script>
