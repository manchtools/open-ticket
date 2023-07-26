<script>
	import TicketReplies from './TicketReplies.svelte';

	export let data;
</script>

<div>
	<h1>
		{data.body}
	</h1>
	<h3>Conversation</h3>

	<TicketReplies replies={data.replies} ticketId={data.$id} />
</div>
