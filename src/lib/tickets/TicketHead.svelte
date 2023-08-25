<script>
	import { page } from '$app/stores';

	export let data;
</script>

<div class="flex flex-col lg:flex-row justify-between w-full lg:items-center gap-2">
	<h1>
		Subject: {data.subject || 'not provided'}
	</h1>
	{#if $page.url.pathname.startsWith('/admin')}
		<form
			action="?/updateTicket"
			method="POST"
			class="flex flex-col lg:flex-row lg:items-center gap-4"
		>
			<input type="text" name="id" value={data.id} hidden />
			<label class="flex flex-row items-center gap-2">
				<p>Status:</p>

				<select class="select w-fit py-1 lg:p-2" name="status" bind:value={data.status}>
					<option value="new"> New </option>
					<option value="open">Open</option>
					<option value="pending">Pending</option>
					<option value="in progress">In progress</option>
					<option value="resolved">Resolved</option>
					<option value="closed">Closed</option>
				</select>
			</label>
			<label class="flex items-center gap-2">
				<p>Queue:</p>

				<select class="select w-fit py-1 lg:p-2" name="queue" value={data.expand?.queue?.id || ''}>
					<option value="">---</option>
					{#each $page.data?.queues as queue}
						<option value={queue.id}>{queue.name}</option>
					{/each}
				</select>
			</label>
			<label class="flex items-center gap-2">
				<p>Agent:</p>

				<select class="select w-fit py-1 lg:p-2" name="agent" value={data.expand.agent?.id || ''}>
					<option value="">---</option>
					<option value="self">My self</option>
					{#each $page.data?.agents as agent}
						<option value={agent.id}>{agent.email}</option>
					{/each}
				</select>
			</label>

			<div>User: {data.expand.createdBy?.email || 'Deleted user'}</div>

			<button class="btn btn-sm variant-ghost-success">Update</button>
		</form>
	{:else}
		<div class="flex flex-col lg:flex-row lg:items-center gap-4">
			<p>Status: {data.status}</p>

			<p>Queue: {data.expand?.queue?.name || 'not assigned'}</p>

			<p>Agent: {$page.data.expand?.agent?.name || data.expand?.agent?.email || 'not assigned'}</p>
			{#if $page.data.user.email !== data.expand?.createdBy?.email}
				<div>Created by: {data.expand?.createdBy?.email || 'Deleted user'}</div>
			{/if}
		</div>
	{/if}
</div>
