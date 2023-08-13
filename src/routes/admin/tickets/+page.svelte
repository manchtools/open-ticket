<script>
	import TicketView from '$lib/tickets/TicketView.svelte';

	export let data;
	console.log(data);
</script>

<TicketView data={data.tickets} />
