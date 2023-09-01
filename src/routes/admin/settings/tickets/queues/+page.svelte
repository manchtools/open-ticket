<script>
	import { goto } from '$app/navigation';
	import { drawerBaseSettings } from '$lib/helpers.js';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let data;

	let page = {
		offset: data.queues.page || 1,
		limit: data.queues.perPage || 25,
		size: data.queues.totalItems,
		amounts: []
	};
	function onPageChange(e) {
		goto(`?offset=${e.detail + 1}`, { invalidateAll: true });
	}
</script>

<div class="flex gap-2 flex-col">
	<button
		class="btn variant-ghost-success self-end flex gap-2"
		on:click={() => {
			let settings = drawerBaseSettings;
			settings['type'] = 'new_queue';
			drawerStore.open(settings);
		}}><Fa icon={faPlus} />Add queue</button
	>
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Name</th>

				<th class="flex items-center justify-between">Members</th>
			</tr>
		</thead>
		<tbody>
			{#each data.queues.items as queue}
				<tr
					on:click={() => {
						let settings = drawerBaseSettings;
						settings['type'] = 'queue';
						settings['data'] = queue;
						drawerStore.open(settings);
					}}
				>
					<td>{queue.name}</td>
					<td
						>{#each queue?.expand?.members || [] as member, index (member.id)}
							{member?.name || member?.email}{#if index != queue?.expand?.members.length - 1},{/if}
						{/each}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
	<small class="self-end">Total queues: {data.queues.totalItems}</small>
	{#if data.queues.items.length > 0}
		<Paginator
			bind:settings={page}
			showNumerals={true}
			maxNumerals={1}
			on:page={onPageChange}
			amountText="queues"
			controlVariant="variant-filled-surface"
			class="self-center"
		/>
	{/if}
</div>
