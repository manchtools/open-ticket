<script>
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import NotificationSetup from './NotificationSetup.svelte';
	import { t } from '$lib/translations/translations';
	import PasswordChange from './PasswordChange.svelte';
	import { pb } from '$lib/db';
	import { goto } from '$app/navigation';
	export let data;
	export let form;
</script>

<div class="h-full w-full flex items-center justify-center">
	<div class="w-1/3">
		<Stepper
			on:complete={async () => {
				let tmp = [];

				data.user.setupSteps.forEach((step) => {
					step[Object.keys(step)[0]] = true;
					tmp.push(step);
				});
				try {
					await pb.collection('users').update(data.user.id, { setupSteps: tmp });
				} catch (e) {
					console.log(e);
				}
				goto('/', { invalidateAll: true });
			}}
		>
			{#each data.user.setupSteps as stepName}
				{#if !Object.values(stepName)[0]}
					{#if (Object.keys(stepName)[0] = 'notificationSetup')}
						<NotificationSetup />
					{/if}
					{#if (Object.keys(stepName)[0] = 'passwordChange')}
						<PasswordChange />
					{/if}
				{/if}
			{/each}
			<Step>
				<svelte:fragment slot="header">{$t('setup.completed.headline')}</svelte:fragment>
				<p />
			</Step>
		</Stepper>
	</div>
</div>
