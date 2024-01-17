<script>
	import TicketBody from './ticketBody.svelte';
	import TicketHead from './ticketHead.svelte';
	import * as Card from '$lib/components/ui/card';
	import TicketReplies from './ticketReplies.svelte';
	export let form;
	export let ticket;
</script>

<Card.Root class="m-2 md:m-6">
	<Card.Header class="p-2 md:p-4">
		<TicketHead {ticket} {form}></TicketHead>
	</Card.Header>
	<hr />
	<Card.Content class="p-2 md:p-4">
		<TicketBody {ticket} {form}></TicketBody>
	</Card.Content>
	<hr />
	<Card.Footer class="p-0">
		<TicketReplies {form} {ticket}></TicketReplies>
	</Card.Footer>
</Card.Root>
