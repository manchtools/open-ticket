<script>
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { bodySchema } from './ticketSchema';

	export let form;
	export let ticket;
</script>

{#if $page.data.user.type.includes('agent')}
	<Form.Root
		method="POST"
		form={form.body}
		action="/ticket/{ticket.id}?/updateTicketBody"
		schema={bodySchema}
		let:config
	>
		<Form.Field {config} name="subject">
			<Form.Item>
				<Form.Label>Subject</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="body">
			<Form.Item>
				<Form.Label>Message</Form.Label>
				<Form.Textarea rows={8} />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Button>Update</Form.Button>
	</Form.Root>
{:else}
	<div class="flex flex-col gap-4">
		<div class="flex flex-col">
			<p class="text-lg font-bold">Subject:</p>
			<p>{ticket.subject || ''}</p>
		</div>
		<div class="flex flex-col">
			<p class=" text-lg font-bold">Message:</p>
			<p class="whitespace-pre-wrap">{ticket.body}</p>
		</div>
	</div>
{/if}
