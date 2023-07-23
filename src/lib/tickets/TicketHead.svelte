<script>
	import { page } from '$app/stores';

	export let data;
	let agentId = data.agent?.$id || '';
</script>

<div class="grid grid-cols-6 w-full items-center">
	<div class=" col-span-3">Subject: {data.subject || 'not provided'}</div>
	<label class="flex items-center gap-2">
		<p>Status:</p>

		<select
			class="select w-fit"
			name="status"
			bind:value={data.status}
			disabled={!$page.route.id.startsWith('/admin')}
		>
			<option value="new"> New </option>
			<option value="open">Open</option>
			<option value="pending">Pending</option>
			<option value="in_progress">In progress</option>
			<option value="resolved">Resolved</option>
			<option value="closed">Closed</option>
		</select>
	</label>
	<label class="flex items-center gap-2">
		<p>Agent:</p>

		<select
			class="select w-fit"
			name="status"
			bind:value={agentId}
			disabled={!$page.route.id.startsWith('/admin')}
		>
			{#each $page.data.agents.documents as agent}
				<option value={agent.$id}>{agent.email}</option>
			{/each}
		</select>
	</label>

	<div>User: {data.createdBy?.email}</div>
</div>
