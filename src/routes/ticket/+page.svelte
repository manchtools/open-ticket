<script>
	import { page } from '$app/stores';
	import TicketView from '$lib/tickets/TicketView.svelte';

	export let form;

	let body = '';
	let subject = '';
</script>

<div class="flex items-center justify-center h-full">
	<div class="flex flex-col gap-2 w-[90%] md:w-2/5">
		<form method="POST" action="?/create" class="gap-2 flex flex-col">
			<span class="flex flex-row gap-2">
				<div class="flex-grow">
					<h2>Subject</h2>
					<input type="text" name="subject" id="subject" class="input" bind:value={subject} />
				</div>
				{#if !$page.data.user}
					<div class="flex-grow">
						<h2>Email</h2>
						<input type="email" name="email" id="email" class="input" required />
					</div>
				{/if}
			</span>
			<label for="body"><h2>Issue</h2></label>
			<textarea name="body" id="" rows="10" class="textarea" bind:value={body} />
			<button class="btn variant-ghost-success" disabled={body.length <= 0}>Submit</button>
		</form>
		{#if form}
			<TicketView tickets={[form]} />
		{/if}
	</div>
</div>
