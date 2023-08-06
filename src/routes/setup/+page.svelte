<script>
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	export let form;
	import { toastStore } from '@skeletonlabs/skeleton';

	if (form?.error) {
		toastStore.trigger({ message: form.message, background: 'variant-filled-error' });
	}
	console.log(form);
</script>

<div class="w-full flex justify-center h-full items-center">
	<div class="w-1/3">
		<Stepper>
			<Step>
				<svelte:fragment slot="header">Please create initial agent user</svelte:fragment>
				<h4>
					This user can later be converted into an SSO user if you choose to configure this option
					in the admin dashboard
				</h4>
				<form action="?/createAgent" method="POST" class="flex gap-2 flex-col">
					<label for="email"> Email </label>
					<input type="email" name="email" class="input" id="email" value={form?.email || ''} />
					<label for="password">
						Password
						<input type="password" name="password" class="input" id="password" />
					</label>
					<label for="passwordConfirm">
						Confirm password

						<input type="password" name="passwordConfirm" class="input" id="passwordConfirm" />
					</label>
					<button class="btn variant-ghost-primary">Create</button>
				</form>
			</Step>
		</Stepper>
	</div>
</div>
