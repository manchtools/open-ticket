<script>
	import * as Card from '$lib/components/ui/card';
	import MessageBubble from './messageBubble.svelte';
	import * as Form from '$lib/components/ui/form';
	import { replySchema } from './ticketSchema';
	import { page } from '$app/stores';
	export let ticket;
	export let form;
</script>

<Card.Root class="flex w-full flex-col border-none">
	<Card.Content class="flex max-h-[450px] flex-col gap-4 overflow-scroll p-4">
		{#each ticket?.expand['replies(ticket)'] || [] as reply}
			<MessageBubble {reply}></MessageBubble>
		{/each}
	</Card.Content>
	<hr />
	<Card.Footer class="p-2 md:p-4">
		<Form.Root
			method="POST"
			form={form.reply}
			action="/ticket/{ticket.id}?/addReply"
			schema={replySchema}
			let:config
			class="flex w-full gap-2"
			options={{ resetForm: true }}
		>
			<div class="flex w-full flex-col">
				<Form.Field {config} name="body">
					<Form.Item class="w-full">
						<Form.Textarea placeholder="Message"></Form.Textarea>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
				{#if $page.data.user.type.includes('agent')}
					<Form.Field {config} name="private">
						<Form.Item class="flex items-center gap-2  space-y-0 self-end">
							<Form.Switch />
							<Form.Label>Private reply</Form.Label>
							<Form.Validation />
						</Form.Item>
					</Form.Field>
				{/if}
			</div>

			<Form.Button>Send</Form.Button>
		</Form.Root>
	</Card.Footer>
</Card.Root>
