<script>
	import { Stepper, Step } from '@skeletonlabs/skeleton';
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
				<form>
					<label for="email"> Email </label>
					<input type="email" name="email" class="input" id="email" />
					<label for="password">
						Password
						<input type="password" name="password" class="input" id="password" />
					</label>
					<label for="passwordConfirm"> Confirm password </label>
					<input type="password" name="passwordConfirm" class="input" id="passwordConfirm" />
				</form>
			</Step>
			<Step>
				<svelte:fragment slot="header">(header)</svelte:fragment>
				(content)
			</Step>
		</Stepper>
	</div>
</div>
