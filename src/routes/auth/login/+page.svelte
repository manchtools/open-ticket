<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { AppwriteService } from '$lib/AppwriteService';
	let email;
	let password;
</script>

<form
	method="POST"
	action="?/login"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				AppwriteService.setSession();
				goto('/', { invalidateAll: true });
			}
		};
	}}
>
	<input type="text" name="email" class="input" bind:value={email} />
	<input type="password" name="password" class="input" bind:value={password} />
	<button>Submit</button>
</form>
