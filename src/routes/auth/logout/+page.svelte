<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		localStorage.removeItem('cookieFallback');
		goto('/auth/login', { invalidateAll: true });
	});
</script>
