<script>
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { format, parse, parseISO } from 'date-fns';

	export let tickets = [];
	let drawerBaseSettings = {
		width: 'w-full',
		height: 'h-[90%]',
		padding: 'p-6',
		rounded: 'rounded-xl',
		bgDrawer: 'bg-purple-900 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50'
	};
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Subject</th>
				<th>body</th>
				<th>Created by</th>
				<th>Agent</th>
				<th>Updated at</th>
				<th>Created at</th>
			</tr>
		</thead>
		<tbody>
			{#each tickets.documents as ticket}
				<tr
					class="hover:cursor-pointer"
					on:click={() => {
						let settings = drawerBaseSettings;
						settings['ticket'] = ticket;
						drawerStore.open(settings);
					}}
				>
					<td>{ticket.subject || ''}</td>
					<td>{ticket.body}</td>
					<td>{ticket.createdBy?.email}</td>
					<td>{ticket.agent?.email || 'not assigned'}</td>
					<td>{format(parseISO(ticket.$createdAt), 'dd.MM.yyyy HH:mm:ss')}</td>
					<td>{format(parseISO(ticket.$updatedAt), 'dd.MM.yyyy HH:mm:ss')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
