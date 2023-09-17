<script>
	import { format, parseISO } from 'date-fns';
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/db';
	import { goto, invalidateAll } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
	import Fa from 'svelte-fa';
	export let data;
	let searchTerms = '';
	let currentQueue = $page.url.searchParams.get('queue') || '';
	let currentStatus = $page.url.searchParams.get('status') || '';
	onMount(() => {
		pb.collection('tickets').subscribe('*', async (e) => {
			if (e.action === 'update' && e.record.updatedBy !== pb.authStore.model.id) {
				invalidateAll();
			}
			if (e.action === 'create') {
				let tmp = await pb
					.collection('tickets')
					.getOne(e.record.id, { expand: 'agent,createdBy,queue' });
				tmp.create = true;
				data.items.unshift(tmp);
				data.totalItems += 1;
				data.items = [...data.items];
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
			<Fa icon={faSearch} />
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
	<div class="flex gap-2 items-ceter w-full">
		{#if $page.url.pathname.startsWith('/admin')}
			<div class="flex items-center gap-2">
				<p>Queue:</p>
				<select
					class="select py-1"
					on:change={(e) => {
						if (e.target.value === '') {
							$page.url.searchParams.delete('queue');
						} else {
							$page.url.searchParams.set('queue', e.target.value);
						}
						goto($page.url.pathname + $page.url.search, { invalidateAll: true });
					}}
					bind:value={currentQueue}
				>
					<option value="">All</option>
					{#each $page.data.queues as queue}
						<option value={queue.id}>{queue.name}</option>
					{/each}
				</select>
			</div>
			<div class="flex items-center gap-2">
				<p>Status:</p>
				<select
					class="select py-1"
					on:change={(e) => {
						if (e.target.value === '') {
							$page.url.searchParams.delete('status');
						} else {
							$page.url.searchParams.set('status', e.target.value);
						}
						goto($page.url.pathname + $page.url.search, { invalidateAll: true });
					}}
					bind:value={currentStatus}
				>
					<option value="">All</option>
					<option value="new"> New </option>
					<option value="open">Open</option>
					<option value="pending">Pending</option>
					<option value="in progress">In progress</option>
					<option value="resolved">Resolved</option>
					<option value="closed">Closed</option>
				</select>
			</div>
		{/if}
		<small class="ml-auto">Total tickets: {data.totalItems}</small>
	</div>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Ticket ID</th>
					<th>Status</th>
					<th>Queue</th>
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
						<td class="flex items-center gap-1">
							{#if (ticket.updatedBy !== pb.authStore.model?.id && ticket.updatedBy !== '') || ticket.update}
								<Fa icon={faCircleDot} class="text-warning-400" />
							{/if}
							{#if ticket.created === ticket.updated}
								<Fa icon={faCircleDot} class="text-success-400" />
							{/if}
							{ticket.id}</td
						>
						<td>{ticket.status}</td>
						<td>{ticket.expand?.queue?.name || 'not assigned'}</td>
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
