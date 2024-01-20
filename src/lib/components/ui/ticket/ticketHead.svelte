<script>
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { headSchema } from './ticketSchema';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Outline from '../outline/outline.svelte';

	import { pb } from '$lib/index';

	import { onMount } from 'svelte';
	import FileBadge from '../fileBadge/fileBadge.svelte';

	export let form;
	export let ticket;

	let statuses = {
		new: 'New',
		open: 'Open',
		'in progress': 'In progress',
		pending: 'Pending',
		resolved: 'Resolved',
		closed: 'Closed'
	};
	let agents = $page.data.agents;
	let queues = $page.data.queues;
	let ticketQueue = {
		value: ticket.expand?.queue?.id || '',
		label: ticket.expand?.queue?.name || ''
	};
	let ticketAgent = {
		value: ticket.expand?.agent?.id || '',
		label: ticket.expand?.agent?.email || ''
	};
	if (ticket.queue) {
		$page.data.queues.map((queue) => {
			if (queue.id === ticket.queue) {
				agents = queue?.expand?.members || [];
			}
		});
	}
	let filetoken;
</script>

{#if $page.data.user.type.includes('agent')}
	<Form.Root
		method="POST"
		form={form.head}
		action="/ticket/{ticket.id}?/updateTicketHead"
		schema={headSchema}
		let:config
		class="flex w-full  flex-wrap  gap-2 md:flex-row md:gap-4 2xl:flex-nowrap"
	>
		<Form.Field {config} name="status" let:attrs>
			{@const { value } = attrs.input}

			<Form.Item>
				<Form.Label>Status</Form.Label>
				<Form.Select selected={{ value, label: statuses[value] }}>
					<Form.SelectTrigger placeholder="Select status" class="w-60" />
					<Form.SelectContent>
						{#each Object.entries(statuses) as [value, status]}
							<Form.SelectItem {value}>
								{status}
							</Form.SelectItem>
						{/each}
					</Form.SelectContent>
				</Form.Select>

				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="queue">
			<Form.Item>
				<Form.Label>Queue</Form.Label>
				<Form.Select
					bind:selected={ticketQueue}
					onSelectedChange={(e) => {
						$page.data.queues.map((queue) => {
							if (e.value !== '') {
								if (queue.id === e.value) {
									agents = queue?.expand?.members || [];
								} else {
								}
							} else {
								agents = $page.data?.agents || [];
							}
						});
					}}
				>
					<Form.SelectTrigger placeholder="Select queue" class="w-60" />
					<Form.SelectContent>
						<Form.SelectItem value="">---</Form.SelectItem>
						{#each queues as queue}
							<Form.SelectItem value={queue.id}>
								{queue.name}
							</Form.SelectItem>
						{/each}
					</Form.SelectContent>
				</Form.Select>

				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="agent">
			<Form.Item>
				<Form.Label>Agent</Form.Label>
				<Form.Select bind:selected={ticketAgent}>
					<Form.SelectTrigger placeholder="Select agent" class="w-60" />
					<Form.SelectContent>
						<Form.SelectItem value="">---</Form.SelectItem>
						{#each agents as agent}
							<Form.SelectItem value={agent.id}>
								{agent.email}
							</Form.SelectItem>
						{/each}
					</Form.SelectContent>
				</Form.Select>

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<div class="min-w-60 space-y-2">
			<Label for="createdBy">Created by</Label>
			<Input
				type="text"
				id="createdBy"
				placeholder="Created by"
				value={ticket.expand?.createdBy?.email}
				disabled
			/>
		</div>

		<Form.Field {config} name="deleted">
			{@const deletedLabel = ticket.deleted ? 'Yes' : 'No'}
			<Form.Item>
				<Form.Label>Mark as deleted</Form.Label>
				<Form.Select selected={{ value: ticket.deleted, label: deletedLabel }}>
					<Form.SelectTrigger placeholder="Select agent" class="w-60" />
					<Form.SelectContent>
						<Form.SelectItem value={false}>No</Form.SelectItem>
						<Form.SelectItem value={true}>Yes</Form.SelectItem>
					</Form.SelectContent>
				</Form.Select>

				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<div class="my-2 flex w-full flex-row flex-wrap justify-between gap-2 self-end md:gap-4">
			<Form.Button class="">Update</Form.Button>
		</div>
	</Form.Root>
{:else}
	<div class="flex flex-col gap-2 md:flex-row md:gap-4">
		<Outline size="sm">
			<div class="flex space-x-1">
				<p>Status:</p>
				<p>{statuses[ticket.status]}</p>
			</div>
		</Outline>

		<Outline size="sm">
			<div class="flex space-x-1">
				<p>Queue:</p>
				<p>{ticket.expand?.queue?.name || 'Not assigned'}</p>
			</div>
		</Outline>
		<Outline size="sm">
			<div class="flex space-x-1">
				<p>Agent:</p>
				<p>{ticket.expand?.agent?.name || ticket.expand?.agent?.email || 'Not assigned'}</p>
			</div>
		</Outline>
	</div>
{/if}
<FileBadge {ticket}></FileBadge>
