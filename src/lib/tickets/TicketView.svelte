<script>
	import { drawerBaseSettings } from '$lib/helpers';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { format, parseISO } from 'date-fns';

	export let tickets = [];
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
			{#each tickets as ticket}
				<tr
					class="hover:cursor-pointer"
					on:click={() => {
						let settings = drawerBaseSettings;
						settings['type'] = 'ticket';
						settings['data'] = ticket;
						drawerStore.open(settings);
					}}
				>
					<td>{ticket.id}</td>
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
