<script>
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { headSchema } from './ticketSchema';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Outline from '../outline/outline.svelte';
	import { badgeVariants } from '$lib/components/ui/badge';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Download } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { pb } from '$lib/index';
	import Button from '../button/button.svelte';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		filetoken = await pb.files.getToken();
	});
</script>

{#if $page.data.user.type.includes('agent')}
	<Form.Root
		method="POST"
		form={form.head}
		action="/ticket/{ticket.id}?/updateTicketHead"
		schema={headSchema}
		let:config
		class="flex w-full gap-4"
	>
		<Form.Field {config} name="status" let:attrs>
			{@const { value } = attrs.input}

			<Form.Item>
				<Form.Label>Status</Form.Label>
				<Form.Select selected={{ value, label: statuses[value] }}>
					<Form.SelectTrigger placeholder="Select status" class="w-64" />
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
					<Form.SelectTrigger placeholder="Select queue" class="w-64" />
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
					<Form.SelectTrigger placeholder="Select agent" class="w-64" />
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

		<div class="space-y-2">
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
			<Form.Item>
				<Form.Label>Delte ticket</Form.Label>
				<Form.Checkbox />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Button class="my-2 self-end">Update</Form.Button>
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
<div class="flex gap-2">
	{#each ticket.attachments as file}
		<Dialog.Root>
			<Dialog.Trigger class={badgeVariants({ variant: 'default' })}>
				<Avatar.Root class="m-0 mr-2 size-6 p-0">
					<Avatar.Image
						src={pb.files.getUrl(ticket, file, { token: filetoken, thumb: '50x50' })}
						alt="@shadcn"
					/>
					<Avatar.Fallback>N/A</Avatar.Fallback>
				</Avatar.Root>

				{file}</Dialog.Trigger
			>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title class="flex items-center gap-2"
						>{file}
						<Button
							href={pb.files.getUrl(ticket, file, { download: true })}
							size="icon"
							variant="ghost"><Download /></Button
						></Dialog.Title
					>
					<Dialog.Description>
						<img src={pb.files.getUrl(ticket, file, { token: filetoken })} alt="" />
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</div>
