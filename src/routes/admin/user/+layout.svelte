<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { formSchema } from './schema.js';
	export let data;

	const types = {
		agent: 'Agent',
		limited_agent: 'Limited agent',
		user: 'User'
	};
	console.log(data);
</script>

<div class="flex flex-col gap-4">
	<Dialog.Root>
		<Dialog.Trigger class="flex"><Button class="ml-auto">New user</Button></Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Create new user</Dialog.Title>
				<Dialog.Description>
					<Form.Root
						method="POST"
						action="/admin/user?/createUser"
						form={data.form.newUser}
						schema={formSchema}
						let:config
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
								<Form.Label>Email *</Form.Label>
								<Form.Input />

								<Form.Validation />
							</Form.Item>
						</Form.Field>
						<Form.Field {config} name="password">
							<Form.Item>
								<Form.Label>Password *</Form.Label>
								<Form.Input />

								<Form.Validation />
							</Form.Item>
						</Form.Field>
						<Form.Field {config} name="type">
							<Form.Item>
								<Form.Label>Type</Form.Label>
								<Form.Select selected={{ value: 'user', label: 'User' }}>
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
						<Form.Button>Create</Form.Button>
					</Form.Root>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
	<div></div>

	<slot />
</div>
