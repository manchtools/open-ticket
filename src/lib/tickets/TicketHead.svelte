<script>
	import { page } from '$app/stores';

	export let data;
	let agentId = data.agent?.$id || '';
</script>

<div class="flex flex-col lg:flex-row justify-between w-full lg:items-center">
	<div>Subject: {data.subject || 'not provided'}</div>
	<div class="flex items-center gap-4">
		<label class="flex items-center gap-2 md:flex-row flex-col">
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
</div>
