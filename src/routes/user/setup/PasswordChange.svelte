<script>
	import { Step } from '@skeletonlabs/skeleton';
	import { t } from '$lib/translations/translations';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let oldPassword;
	let newPassword = '';
	let confirmPassword = '';
	let locked = true;
</script>

<Step {locked}>
	<svelte:fragment slot="header">{$t('setup.passwordChange.headline')}</svelte:fragment>
	<form
		action="?/updatePassword"
		method="POST"
		class="flex gap-2 flex-col"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				}
			};
		}}
	>
		<label for="oldPassword">
			<p>{$t('base.oldPassword')}</p>
			<input
				type="password"
				name="oldPassword"
				class="input"
				bind:value={oldPassword}
				class:input-error={oldPassword === ''}
			/>
			{#if oldPassword === ''}
				<small>{$t('base.oldPasswordRequired')}</small>
			{/if}
		</label>
		<label for="password">
			<p>{$t('base.newPassword')}</p>
			<input
				type="password"
				name="password"
				class="input"
				bind:value={newPassword}
				class:input-error={oldPassword === newPassword && oldPassword.length !== 0}
			/>
			{#if oldPassword === newPassword && oldPassword.length !== 0}
				<small>{$t('base.noPasswordReuse')}</small>
			{/if}
		</label>
		<label for="passwordConfirm">
			<p>{$t('base.confirmPassword')}</p>
			<input
				type="password"
				name="passwordConfirm"
				class="input"
				bind:value={confirmPassword}
				class:input-error={newPassword !== confirmPassword}
			/>
		</label>
		{#if newPassword !== confirmPassword}
			<small>{$t('base.passwordsDontMatch')}</small>
		{/if}
		<button
			class="btn variant-ghost-primary"
			disabled={oldPassword?.length === 0 ||
				newPassword.length === 0 ||
				confirmPassword?.length === 0 ||
				oldPassword === newPassword ||
				newPassword !== confirmPassword}>{$t('setup.passwordChange.changePassword')}</button
		>
	</form>
</Step>
