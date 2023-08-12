<script>
	import { toastStore } from '@skeletonlabs/skeleton';
	import { format, parseISO } from 'date-fns';
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/db';
	import { goto, invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	export let tickets = [];
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
				tickets.unshift(tmp);
				tickets = [...tickets];
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
</script>

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
			{#each tickets as ticket (ticket.id)}
				<tr
					class="hover:cursor-pointer"
					on:click={() => {
						if ($page.url.pathname.startsWith('/admin')) {
							goto(`/admin/tickets/${ticket.id}`);
						} else {
							goto(`/ticket/${ticket.id}`);
						}
					}}
					in:fade
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
