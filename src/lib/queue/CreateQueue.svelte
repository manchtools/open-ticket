<script>
	import { page } from '$app/stores';
	$: selection = [];
	$: selectString = JSON.stringify(selection);
</script>

<form action="?/addQueue" method="POST" class="flex flex-col gap-4">
	<input type="text" class="input" name="name" />
	<input type="text" name="members" value={selectString} hidden />
	{#each $page.data.agents as agent}
		<label class="flex items-center gap-2">
			<input type="checkbox" class="checkbox" value={agent.id} bind:group={selection} />
			<p>
				{agent.name || agent.email}
			</p>
		</label>
	{/each}

	<button class="btn variant-ghost-success w-fit">Create</button>
</form>
