<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { clipboard, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { faClipboardCheck, faClipboard } from '@fortawesome/free-solid-svg-icons';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	export let form = {};
	let copied = false;
</script>

<div class="flex">
	<h1>Create new {$page.url.pathname.includes('admins') ? 'admin' : 'user'}</h1>
	<button
		class="btn btn-sm variant-ghost-surface w-fit ml-auto"
		on:click|preventDefault={() => drawerStore.close()}>X</button
	>
</div>
<form
	action="?/createUser"
	method="POST"
	class="flex flex-col gap-5"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'error') {
			} else {
				form = result.data;
				invalidateAll();
			}
		};
	}}
>
	<label for="name">
		<p>Name</p>
		<input type="text" name="name" id="" class="input" />
	</label>
	<label for="email">
		<p>Email</p>
		<input type="email" name="email" id="" class="input" />
	</label>
	{#if $page.url.pathname?.includes('/settings/admins')}
		<SlideToggle name="limited_agent" active="bg-primary-500" size="sm">Limited Agent</SlideToggle>
	{/if}
	{#if form?.tmpPass}
		<div>
			<p>User password</p>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type="text"
					value={form?.tmpPass || '123455sfdfa'}
					class="input"
					disabled
					data-clipboard="tmpPass"
				/>

				<button
					class="btn"
					on:click|preventDefault={() => {
						copied = true;
						setTimeout(() => {
							copied = false;
						}, 1000);
					}}
					use:clipboard={{ input: 'tmpPass' }}
				>
					{#if copied}
						<Fa icon={faClipboardCheck} />
					{:else}
						<Fa icon={faClipboard} />
					{/if}</button
				>
			</div>
		</div>
	{/if}
	<button class="btn variant-ghost-success w-fit self-start">Create</button>
</form>
