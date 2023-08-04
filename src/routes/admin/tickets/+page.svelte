<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/db.js';
	import { serializePoJos } from '$lib/helpers.js';
	import TicketView from '$lib/tickets/TicketView.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	export let data;

	let searchTerms = '';
	let tickets = data.tickets || [];

	$: if (searchTerms.length === 0) {
		tickets = [...data.tickets.items];
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
	let page = {
		offset: data.tickets.page || 1,
		limit: data.tickets.perPage || 25,
		size: data.tickets.totalItems,
		amounts: []
	};
	function onPageChange(e) {
		goto(`?offset=${e.detail + 1}`, { invalidateAll: true });
	}
</script>

<div class="flex gap-2 flex-col">
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
	<Paginator
		bind:settings={page}
		showNumerals={true}
		maxNumerals={1}
		on:page={onPageChange}
		amountText="tickets"
		controlVariant="variant-filled-surface"
		class="self-center"
	/>
	<small class="self-end">Total tickets: {data.tickets.totalItems}</small>
	<TicketView {tickets} />
	<Paginator
		bind:settings={page}
		showNumerals={true}
		maxNumerals={1}
		on:page={onPageChange}
		amountText="tickets"
		controlVariant="variant-filled-surface"
		class="self-center"
	/>
</div>
