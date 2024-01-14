<script>
	import Ticket from '$lib/components/ui/ticket/ticket.svelte';

	export let data;
</script>

<Ticket ticket={data.ticket} form={data.form}></Ticket>
