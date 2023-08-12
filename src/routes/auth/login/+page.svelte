<script>
	export let form;
	export let data;

	import { toastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { pb } from '$lib/db.js';

	if (form?.error) {
		toastStore.trigger({ message: form.message, background: 'variant-filled-error' });
	}
</script>

<div class="flex flex-col w-full h-full justify-center items-center">
	<form
		method="POST"
		action="?/login"
		class="flex flex-col gap-2 w-[95%] md:w-1/3 card p-4 variant-ghost"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			// `formElement` is this `<form>` element
			// `formData` is its `FormData` object that's about to be submitted
			// `action` is the URL to which the form is posted
			// calling `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted

			return async ({ result, update }) => {
				pb.authStore.loadFromCookie(result.data);
				update();

				// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			};
		}}
	>
		<label for="email">
			Email
			<input type="email" name="email" class="input" value={form?.email || ''} />
		</label>
		<label for="password">
			Password
			<input type="password" name="password" class="input" />
		</label>
		<button class="btn variant-ghost-primary w-fit self-center">Login</button>
		{#if data.authMethods.authProviders.length > 0}
			<hr class="my-4" />
			<div class="flex gap-4 flex-col w-[95%] md:w-1/3 self-center">
				{#each data.authMethods.authProviders as provider}
					<button
						class="btn variant-filled flex flex-row"
						formaction="?/loginOauth&provider={provider.name}"
					>
						<i class="fa-brands fa-{provider.name}" />
						<div class="flex">
							<p>Sign in with {provider.name}</p>
						</div>
					</button>
				{/each}
			</div>
		{/if}
	</form>
</div>
