<script>
	import TicketBody from './TicketBody.svelte';
	import TicketHead from './TicketHead.svelte';

	export let data;
</script>

<div class="m-4">
	<TicketHead {data} />
	<TicketBody {data} />
</div>
