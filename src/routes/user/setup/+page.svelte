<script>
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import NotificationSetup from './NotificationSetup.svelte';
	import { t } from '$lib/translations/translations';
	import PasswordChange from './PasswordChange.svelte';
	import { pb } from '$lib/db';
	import { goto } from '$app/navigation';
	import { env as pub } from '$env/dynamic/public';

	export let data;
	export let form;
	const readOnlySteps = data.user.setupSteps;
</script>

<div class="h-full w-full flex items-center justify-center">
	<div class="w-1/3">
		<Stepper
			on:next={(e) => {
				console.log(data.user.setupSteps);
				data.user.setupSteps[Object.keys(data.user.setupSteps)[e.detail.step]] = true;
				console.log(data.user.setupSteps);
			}}
			on:complete={async () => {
				try {
					await pb.collection('users').update(data.user.id, { setupSteps: data.user.setupSteps });
				} catch (e) {
					console.log(e);
				}
				goto('/', { invalidateAll: true });
			}}
		>
			{#each Object.entries(readOnlySteps) as [stepName, value]}
				{#if value === false}
					{#if (stepName = 'notificationSetup') && pub.PUBLIC_VAPID !== ''}
						<NotificationSetup />
					{/if}
					{#if (stepName = 'passwordChange')}
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
