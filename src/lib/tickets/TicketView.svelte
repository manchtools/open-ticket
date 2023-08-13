<script>
	import { toastStore } from '@skeletonlabs/skeleton';
	import { format, parseISO } from 'date-fns';
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/db';
	import { goto, invalidateAll } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	export let data;
	let searchTerms = '';
	onMount(() => {
		pb.collection('tickets').subscribe('*', async (e) => {
			if (e.action === 'update' && e.record.updatedBy !== pb.authStore.model.id) {
				toastStore.trigger({
					message: `Ticket <a href="/admin/tickets/${e.record.id}" class="underline">${e.record.id}</a> was updated!`,
					background: 'variant-ghost-warning'
				});
				invalidateAll();
			}
			if (e.action === 'create') {
				let tmp = await pb.collection('tickets').getOne(e.record.id, { expand: 'agent,createdBy' });
				tmp.create = true;
				data.items.unshift(tmp);
				data.totalItems += 1;
				data.items = [...data.items];
				toastStore.trigger({
					message: `A new ticket <a href="/admin/tickets/${e.record.id}" class="underline">${e.record.id}</a> was created!`,

					background: 'variant-ghost-success'
				});
			}
		});
	});
	onDestroy(() => {
		pb.collection('tickets').unsubscribe('*');
	});
	$: if (searchTerms.length === 0) {
		$page.url.searchParams.delete('offset');
		$page.url.searchParams.delete('search');
	}

	$: pageSettings = {
		offset: data.page - 1,
		limit: data.perPage,
		size: data.totalItems,
		amounts: []
	};
	$: console.log(data, pageSettings);
	function onPageChange(e) {
		$page.url.searchParams.set('offset', e.detail + 1);
		goto('?' + $page.url.searchParams.toString(), { invalidateAll: true });
	}
	function search() {
		if (searchTerms.length > 0) {
			$page.url.searchParams.set('search', searchTerms);
			goto($page.url.pathname + $page.url.search, { invalidateAll: true });
		} else {
			$page.url.searchParams.delete('search');
			goto($page.url.pathname + $page.url.search, { invalidateAll: true });
		}
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
					search();
				}
			}}
		/>
		<button
			class="variant-filled-primary"
			on:click={async () => {
				search();
			}}
		>
			<i class="fa-solid fa-magnifying-glass" />
		</button>
	</div>
	{#if data.items.length > 15}
		<Paginator
			bind:settings={pageSettings}
			showNumerals={true}
			maxNumerals={1}
			on:page={onPageChange}
			amountText="tickets"
			controlVariant="variant-filled-surface"
			class="self-center"
		/>
	{/if}
	<small class="self-end">Total tickets: {data.totalItems}</small>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Ticket ID</th>
					<th>Status</th>
					<th>Subject</th>
					<th>body</th>
					<th>Created by</th>
					<th>Agent</th>
					<th>Created at</th>
					<th>Updated at</th>
				</tr>
			</thead>
			<tbody>
				{#each data.items as ticket (ticket.id)}
					<tr
						class="hover:cursor-pointer"
						on:click={() => {
							if ($page.url.pathname.startsWith('/admin')) {
								goto(`/admin/tickets/${ticket.id}`);
							} else {
								goto(`/ticket/${ticket.id}`);
							}
						}}
						in:fly={{ y: -50, duration: 125 }}
					>
						<td>
							{#if (ticket.updatedBy !== pb.authStore.model?.id && ticket.updatedBy !== '') || ticket.update}
								<button>
									<i class="fa-regular fa-circle-dot text-warning-400" />
								</button>
							{/if}
							{#if ticket.created === ticket.updated}
								<i class="fa-regular fa-circle-dot text-success-400" />
							{/if}
							{ticket.id}</td
						>
						<td>{ticket.status}</td>
						<td>{ticket.subject || ''}</td>
						<td>{ticket.body}</td>
						<td>{ticket.expand.createdBy?.email || 'Deleted user'}</td>
						<td>{ticket.expand.agent?.email || 'not assigned'}</td>
						<td>{format(parseISO(ticket.created), 'dd.MM.yyyy HH:mm:ss')}</td>
						<td>{format(parseISO(ticket.updated), 'dd.MM.yyyy HH:mm:ss')}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if data.items.length > 0}
		<Paginator
			bind:settings={pageSettings}
			showNumerals={true}
			maxNumerals={1}
			on:page={onPageChange}
			amountText="tickets"
			controlVariant="variant-filled-surface"
			class="self-center"
		/>
	{/if}
</div>
