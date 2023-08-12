<script>
	import TicketReplies from './TicketReplies.svelte';

	export let data;
</script>

<div>
	<h4 class=" whitespace-pre-wrap">
		{data.body}
	</h4>
	<hr class="my-2" />
	<TicketReplies
		replies={data.expand.replies}
		ticketId={data.id}
		ticketCreator={data.expand?.createdBy?.id}
	/>
</div>
