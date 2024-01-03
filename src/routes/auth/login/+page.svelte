<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { account } from '$lib/appwrite.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	export let data;
	let loading = false;
	async function login(provider) {
		await account.createOAuth2Session(provider);
	}
	async function submit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const type = e.submitter.dataset.type;

		if (type === 'login') {
			loading = true;
			await account.createEmailSession(formData.get('email'), formData.get('password'));
			loading = false;
			goto('/', { invalidateAll: true });
		}
	}
</script>

<Card.Root class="m-4 w-full max-w-[900px]">
	<Card.Header>Sign in</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<form on:submit={submit} class="flex flex-col gap-2">
			<Input type="email" placeholder="Email" name="email" required />
			<Input type="password" placeholder="Password" name="password" required />

			<Button type="submit" data-type="login" disabled={loading}>Login</Button>
		</form>
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t" />
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			{#each data.provider as provider}
				<Button
					on:click={() => {
						login(provider.key);
					}}>{provider.name}</Button
				>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
