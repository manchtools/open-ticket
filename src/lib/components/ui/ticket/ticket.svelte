<script>
	import TicketBody from './ticketBody.svelte';
	import TicketHead from './ticketHead.svelte';
	import * as Card from '$lib/components/ui/card';
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import pb from '$lib';
	import { superValidate } from 'sveltekit-superforms/server';
	import { bodySchema, headSchema } from './ticketSchema';
	import { page } from '$app/stores';
	import { MessageCircle } from 'lucide-svelte';

	import TicketReplies from './ticketReplies.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import Button from '../button/button.svelte';

	export let form;
	export let ticket;
	let message = '';
	let privateMsg = false;
	let staging;

	onMount(async () => {
		pb.collection('replies').subscribe(
			'*',
			(e) => {
				if (e.action === 'create') {
					ticket.expand['replies(ticket)']?.push(e.record);
					ticket = ticket;
					if (e.record.createdBy !== $page.data.user.id) {
						toast.info('New reply was added');
					}
				}
			},
			{ filter: pb.filter('ticket = {:ticket}', { ticket: ticket.id }) }
		);
		pb.collection('tickets').subscribe(ticket.id, (e) => {
			staging = e.record;
			if (e.action === 'update') {
				if (e.record.updatedBy !== $page.data.user.id) {
					toast('Ticket was updated', {
						action: {
							label: 'See changes',
							onClick: async () => {
								form.body = await superValidate(staging, bodySchema);
								form.head = await superValidate(staging, headSchema);
								form = form;
							}
						},
						duration: Number.POSITIVE_INFINITY
					});
				}
			}
		});
	});
	onDestroy(() => {
		pb.collection('replies').unsubscribe('*');
	});
</script>

<Card.Root>
	<Card.Header class="p-2 md:p-4">
		{#key form.head}
			<TicketHead {ticket} {form}></TicketHead>
		{/key}
		<Drawer.Root>
			<Drawer.Trigger class="self-end"
				><Button>
					<MessageCircle class="mr-2 size-6" />
					<p class="flex">
						Open Chat
						{#if ticket.expand['replies(ticket)']}
							<small class="relative text-muted [right:-7px] [top:-7px]"
								>{ticket.expand['replies(ticket)'].length > 100
									? '100+'
									: ticket.expand['replies(ticket)'].length}</small
							>
						{/if}
					</p>
				</Button></Drawer.Trigger
			>
			<Drawer.Content>
				<TicketReplies {form} {ticket} bind:message bind:privateMsg></TicketReplies>
			</Drawer.Content>
		</Drawer.Root>
	</Card.Header>
	<hr />
	<Card.Content class="p-2 md:p-4">
		{#key form.body}
			<TicketBody {ticket} {form}></TicketBody>
		{/key}
	</Card.Content>
</Card.Root>
