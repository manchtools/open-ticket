<script>
	export let form;
	import { toastStore } from '@skeletonlabs/skeleton';

	if (form?.error) {
		toastStore.trigger({ message: form.message, background: 'variant-filled-error' });
	}
</script>

<form method="POST" action="?/login">
	<input type="text" name="email" class="input" value={form?.email || ''} />
	<input type="password" name="password" class="input" />
	<button>Submit</button>
</form>
