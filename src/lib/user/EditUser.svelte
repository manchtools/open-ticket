<script>
	export let data;
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { t } from '$lib/translations/translations';
	let disabled = true;
	let agent = data.type === 'agent' ? true : false;
	let limitedAgent = data.type === 'limited_agent' ? true : false;
</script>

<form action="?/updateUser" method="POST" class="flex flex-col gap-4">
	<input type="text" name="id" value={data.id} hidden />
	<div class="self-end flex gap-4">
		{#if disabled}
			<button
				class="btn btn-sm variant-ghost-warning"
				on:click|preventDefault={() => {
					disabled = false;
				}}
			>
				Edit
			</button>
		{:else if !$page.url.pathname.startsWith('/user')}
			<button class="btn btn-sm variant-filled-error" formaction="?/deleteUser">Delete</button>
			<button class="btn btn-sm variant-ghost-success w-fit self-end">Update</button>
			<button
				class="btn btn-sm variant-ghost-surface w-fit self-end"
				on:click|preventDefault={() => drawerStore.close()}>X</button
			>
		{:else}
			<button class="btn btn-sm variant-ghost-success w-fit self-end">Update</button>
			<button
				class="btn btn-sm variant-ghost-surface w-fit self-end"
				on:click|preventDefault={() => (disabled = true)}>X</button
			>
		{/if}
	</div>
	{#if $page.url.pathname.startsWith('/user')}
		<label for="notifications" class="w-fit">
			<input
				type="text"
				class="input"
				name="notificationPrefs"
				bind:value={data.notificationPrefs}
				hidden
			/>
			<h3>Notification Settings</h3>

			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					value="ticket.*.created"
					bind:group={data.notificationPrefs}
					{disabled}
				/>
				<p>{$t('notifications.preferences.ticket.*.created')}</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					value="ticket.*.updated"
					bind:group={data.notificationPrefs}
					{disabled}
				/>
				<p>{$t('notifications.preferences.ticket.*.updated')}</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					value="ticket.*.reply.*.created"
					bind:group={data.notificationPrefs}
					{disabled}
				/>
				<p>{$t('notifications.preferences.ticket.*.reply.*.created')}</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					value="ticket.*.reply.*.updated"
					bind:group={data.notificationPrefs}
					{disabled}
				/>
				<p>{$t('notifications.preferences.ticket.*.reply.*.updated')}</p>
			</label>
			{#if $page.data.user.type === 'agent'}
				<label class="flex items-center space-x-2">
					<input
						class="checkbox"
						type="checkbox"
						value="queue.*.created"
						bind:group={data.notificationPrefs}
						{disabled}
					/>
					<p>{$t('notifications.preferences.queue.*.created')}</p>
				</label>
				<label class="flex items-center space-x-2">
					<input
						class="checkbox"
						type="checkbox"
						value="queue.*.updated"
						bind:group={data.notificationPrefs}
						{disabled}
					/>
					<p>{$t('notifications.preferences.queue.*.updated')}</p>
				</label>
			{/if}
		</label>
	{/if}
	<label for="name">
		<p>Name</p>
		<input type="text" name="name" value={data.name} class="input" {disabled} />
	</label>
	<label for="email">
		<p>Email</p>
		<input type="email" name="email" value={data.email} class="input" {disabled} />
	</label>
	{#if $page.url.pathname.startsWith('/user')}
		<label for="oldPassword">
			<p>Old Password</p>
			<input type="password" name="oldPassword" class="input" {disabled} />
		</label>
	{/if}
	<label for="password">
		<p>Password</p>
		<input type="password" name="password" class="input" {disabled} />
	</label>
	<label for="passwordConfirm">
		<p>Confirm password</p>
		<input type="password" name="passwordConfirm" class="input" {disabled} />
	</label>
	{#if $page.url.pathname?.startsWith('/admin')}
		<SlideToggle name="agent" active="bg-primary-500" size="sm" bind:checked={agent} {disabled}
			>Agent</SlideToggle
		>

		<SlideToggle
			name="limited_agent"
			active="bg-primary-500"
			size="sm"
			bind:checked={limitedAgent}
			{disabled}>Limited Agent</SlideToggle
		>
	{/if}
</form>
