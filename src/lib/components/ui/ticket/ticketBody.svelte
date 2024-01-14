<script>
	import * as Form from '$lib/components/ui/form';
	import { bodySchema } from './ticketSchema';

	export let form;
	export let ticket;
</script>

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
			<Form.Textarea />

			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</Form.Root>
