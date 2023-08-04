<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/db';

	// import { AppwriteService } from '$lib/AppwriteService';
	// import { handleAppwriteError } from '$lib/helpers';
	let email;
	let password;
</script>

<form
	method="POST"
	action="?/login"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				pb.authStore.loadFromCookie(result.data);
				goto('/', { invalidateAll: true });
			}
		};
	}}
>
	<input type="text" name="email" class="input" bind:value={email} />
	<input type="password" name="password" class="input" bind:value={password} />
	<button>Submit</button>
</form>
