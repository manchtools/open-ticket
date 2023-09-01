<script>
	export let data;
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	let disabled = true;

	$: selectString = JSON.stringify(data.members);
</script>

<form action="?/updateQueue" method="POST" class="flex flex-col gap-4">
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
		{:else}
			<button class="btn btn-sm variant-filled-error" formaction="?/deleteQueue">Delete</button>
			<button class="btn btn-sm variant-ghost-success w-fit self-end">Update</button>
			<button
				class="btn btn-sm variant-ghost-surface w-fit self-end"
				on:click|preventDefault={() => drawerStore.close()}>X</button
			>
		{/if}
	</div>
	<input type="text" class="input" name="name" value={data.name} />
	<input type="text" name="members" value={selectString} hidden />
	<div class="max-w-[60vh] flex flex-col gap-2">
		{#each $page.data.agents as agent}
			<label class="flex items-center gap-2">
				<input
					type="checkbox"
					class="checkbox"
					class:cursor-not-allowed={disabled}
					value={agent.id}
					bind:group={data.members}
					{disabled}
				/>
				<p class:opacity-40={disabled}>
					{agent.name || agent.email}
				</p>
			</label>
		{/each}
	</div>
</form>
