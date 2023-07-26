<script>
	import TicketView from '$lib/tickets/TicketView.svelte';

	export let data;
</script>

<TicketView tickets={data.tickets.documents} />
