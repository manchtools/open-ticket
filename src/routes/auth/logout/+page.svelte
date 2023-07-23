<script>
	import { goto } from '$app/navigation';
	import { AppwriteService } from '$lib/AppwriteService';
	import { onMount } from 'svelte';

	onMount(async () => {
		localStorage.removeItem('cookieFallback');
		goto('/auth/login');
	});
</script>
