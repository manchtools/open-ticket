<script>
	import { Step } from '@skeletonlabs/skeleton';
	import { t } from '$lib/translations/translations';
	export let form;
	console.log(form);
</script>

<Step>
	<svelte:fragment slot="header">{$t('setup.passwordChange.headline')}</svelte:fragment>
	<form action="?/updatePassword" method="POST" class="flex gap-2 flex-col">
		<label for="oldPassword">
			<p>{$t('base.oldPassword')}</p>
			<input type="password" name="oldPassword" class="input" />
		</label>
		<label for="password">
			<p>{$t('base.newPassword')}</p>
			<input type="password" name="password" class="input" />
		</label>
		<label for="passwordConfirm">
			<p>{$t('base.confirmPassword')}</p>
			<input type="password" name="passwordConfirm" class="input" />
		</label>
		<button class="btn variant-ghost-primary">{$t('setup.passwordChange.changePassword')}</button>
	</form>
</Step>
