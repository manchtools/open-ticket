<script>
	import * as Card from '$lib/components/ui/card';
	import MessageBubble from './messageBubble.svelte';
	import * as Form from '$lib/components/ui/form';
	import { replySchema } from './ticketSchema';
	import { page } from '$app/stores';
	import { afterUpdate, onMount } from 'svelte';

	export let ticket;
	export let form;
	function scrollToLastMessage() {
		document.getElementById('anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
	onMount(() => {
		scrollToLastMessage();
	});
	afterUpdate(() => {
		scrollToLastMessage();
	});
</script>

<Card.Root class="flex w-full flex-col border-none">
	<Card.Header>
		<Card.Description class="self-end"
			>{ticket.expand['replies(ticket)']?.length || 0} Replies</Card.Description
		>
	</Card.Header>
	<Card.Content class="flex max-h-[450px] flex-col gap-4 overflow-scroll p-4">
		{#if !ticket?.expand['replies(ticket)']}
			<h3 class="self-center">No messages, start a new conversation!</h3>
		{/if}
		{#each ticket?.expand['replies(ticket)'] || [] as reply}
			<MessageBubble {reply}></MessageBubble>
		{/each}
		<div id="anchor"></div>
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
			options={{
				resetForm: true
			}}
		>
			<Form.Field {config} name="body">
				<Form.Item class="w-full">
					<Form.Textarea placeholder="Message"></Form.Textarea>

					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<div class="flex flex-col gap-4">
				<Form.Button>Send</Form.Button>
				{#if $page.data.user.type.includes('agent')}
					<Form.Field {config} name="private">
						<Form.Item class="flex items-center gap-2  space-y-0 self-end">
							<Form.Switch />
							<Form.Label class="text-nowrap">Private reply</Form.Label>
							<Form.Validation />
						</Form.Item>
					</Form.Field>
				{/if}
			</div>
		</Form.Root>
	</Card.Footer>
</Card.Root>
