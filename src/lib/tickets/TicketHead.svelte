<script>
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let data;
	let disabled = true;
	let agentId = data.expand?.agent?.id || '';
</script>

<div class="flex flex-col lg:flex-row justify-between w-full lg:items-center gap-2">
	<h1>
		Subject: {data.subject || 'not provided'}
	</h1>
	{#if $page.route.id.startsWith('/admin')}
		<form
			action="?/updateTicket"
			method="POST"
			class="flex flex-col lg:flex-row lg:items-center gap-4"
		>
			<label class="flex flex-row items-center gap-2">
				<input type="text" name="id" value={data.id} hidden />
				<p>Status:</p>

				<select class="select w-fit py-1 lg:p-2" name="status" bind:value={data.status} {disabled}>
					<option value="new"> New </option>
					<option value="open">Open</option>
					<option value="pending">Pending</option>
					<option value="in progress">In progress</option>
					<option value="resolved">Resolved</option>
					<option value="closed">Closed</option>
				</select>
			</label>
			<label class="flex items-center gap-2">
				<p>Agent:</p>

				<select class="select w-fit py-1 lg:p-2" name="agent" bind:value={agentId} {disabled}>
					{#each $page.data?.agents as agent}
						<option value={agent.id}>{agent.email}</option>
					{/each}
				</select>
			</label>

			<div>User: {data.expand.createdBy?.email || 'Deleted user'}</div>

			{#if disabled}
				<button
					class="btn btn-sm variant-ghost-warning"
					on:click|preventDefault={() => {
						disabled = false;
					}}
				>
					Edit
				</button>
			{:else}
				<button class="btn btn-sm variant-ghost-success">Update</button>
				<button
					class="btn btn-sm variant-ghost-surface"
					on:click|preventDefault={() => drawerStore.close()}>X</button
				>
			{/if}
		</form>
	{:else}
		<div class="flex flex-col lg:flex-row lg:items-center gap-4">
			<p>Status: {data.status}</p>

			<p>Agent: {data.expand?.agent?.name || data.expand?.agent?.email || 'not assigned'}</p>

			<div>Created by: {data.expand?.createdBy?.email || 'Deleted user'}</div>
		</div>
	{/if}
</div>
