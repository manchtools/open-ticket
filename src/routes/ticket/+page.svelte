<script>
	import TicketView from '$lib/tickets/TicketView.svelte';

	export let form;

	let body = '';
	let subject = '';
</script>

<div class="flex items-center justify-center h-full">
	<div class="flex flex-col gap-2 w-2/5">
		<form method="POST" action="?/create" class="gap-2 flex flex-col">
			<label for="subject">
				<h2>Subject</h2>
			</label>
			<input type="text" name="subject" id="subject" class="input" bind:value={subject} />
			<label for="body"><h2>Issue</h2></label>
			<textarea name="body" id="" rows="10" class="textarea" bind:value={body} />
			<button class="btn variant-ghost-success" disabled={body.length <= 0}>Submit</button>
		</form>
		{#if form}
			<TicketView tickets={[form]} />
		{/if}
	</div>
</div>
