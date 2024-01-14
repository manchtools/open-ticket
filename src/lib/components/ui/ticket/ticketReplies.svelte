<script>
	import * as Card from '$lib/components/ui/card';
	import MessageBubble from './messageBubble.svelte';
	import * as Form from '$lib/components/ui/form';
	import { replySchema } from './ticketSchema';
	export let ticket;
	export let form;
	console.log(ticket);
</script>

<Card.Root class="w-full border-none">
	<Card.Content class="flex max-h-[400px] flex-col gap-4 overflow-scroll p-6">
		{#each ticket.expand['replies(ticket)'] as reply}
			<MessageBubble {reply}></MessageBubble>
		{/each}
	</Card.Content>
	<hr />
	<Card.Footer class="p-4">
		<Form.Root
			method="POST"
			form={form.reply}
			action="/ticket/{ticket.id}?/addReply"
			schema={replySchema}
			let:config
			class="flex w-full gap-2"
		>
			<Form.Field {config} name="body">
				<Form.Item class="w-full">
					<Form.Textarea placeholder="Message" />

					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Button>Send</Form.Button>
		</Form.Root>
	</Card.Footer>
</Card.Root>
