<script>
	export let data;
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Form from '$lib/components/ui/form';
	import { formSchema } from './schema.js';
	let loading = false;
	const types = {
		agent: 'Agent',
		limited_agent: 'Limited agent',
		user: 'User'
	};
</script>

<div class="flex justify-center">
	<Card.Root class="w-[95%] max-w-4xl md:w-2/3">
		<Card.Header class="flex flex-row items-center justify-between">
			<p>
				Edit user {data.form.user.data.email}
			</p>
			<AlertDialog.Root>
				<AlertDialog.Trigger><Button variant="destructive">Delete</Button></AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This will permanently delete the user from your system!
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>No</AlertDialog.Cancel>
						<form action="?/deleteUser" method="POST">
							<AlertDialog.Action type="submit">Yes</AlertDialog.Action>
						</form>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4">
			<Form.Root
				method="POST"
				action="?/updateUser"
				form={data.form.user}
				schema={formSchema}
				let:config
				enctype="multipart/form-data"
				class="flex flex-col gap-2"
			>
				<Form.Field {config} name="name">
					<Form.Item>
						<Form.Label>Name</Form.Label>
						<Form.Input />

						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="email">
					<Form.Item>
						<Form.Label>Email</Form.Label>
						<Form.Input />

						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="type" let:attrs>
					{@const { value } = attrs.input}
					<Form.Item>
						<Form.Label>Type</Form.Label>
						<Form.Select selected={{ value, label: types[value] }}>
							<Form.SelectTrigger placeholder="Select Type" class="w-60" />
							<Form.SelectContent>
								<Form.SelectItem value="user">User</Form.SelectItem>
								<Form.SelectItem value="agent">Agent</Form.SelectItem>
								<Form.SelectItem value="limited_agent">Limited agent</Form.SelectItem>
							</Form.SelectContent>
						</Form.Select>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Button>Update</Form.Button>
			</Form.Root>
		</Card.Content>
	</Card.Root>
</div>
