<script>
	import { pb } from '$lib/db.js';
	import { serializePoJos } from '$lib/helpers.js';
	import TicketView from '$lib/tickets/TicketView.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	export let data;

	let searchTerms = '';
	let tickets = data.tickets || [];

	$: if (searchTerms.length === 0) {
		tickets = [...data.tickets];
	}
	async function search() {
		try {
			const res = await pb.collection('tickets').getFullList({
				filter: `body ~ '${searchTerms}'||subject ~ '${searchTerms}'||id = '${searchTerms}'`
			});

			return serializePoJos(res);
		} catch (e) {
			toastStore.trigger({ message: e.message, background: 'variant-filled-error' });
		}
	}
</script>

<div class="input-group input-group-divider grid-cols-[1fr_auto] mb-2">
	<input
		type="search"
		placeholder="Search..."
		bind:value={searchTerms}
		on:keydown={async (e) => {
			if (e.key === 'Enter') {
				const res = await search();
				tickets = [...res];
			}
		}}
	/>
	<button
		class="variant-filled-primary"
		on:click={async () => {
			const res = await search();
			tickets = [...res];
		}}
	>
		<i class="fa-solid fa-magnifying-glass" />
	</button>
</div>

<TicketView {tickets} />
