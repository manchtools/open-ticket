<script>
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Badge } from '$lib/components/ui/badge';
	import { formSchema } from './schema';
	import { X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data;

	let files = [];
	function handleFileUpload(ev) {
		files = [...ev.target.files, ...files];
		ev.target.value = null;
	}
	const options = {
		onSubmit: (e) => {
			e.formData.delete('attachments');
			for (const file of files) {
				e.formData.append('attachments', file);
			}
		},
		onError: (e) => {
			toast.error(e.result.error.message);
		}
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Create a ticket</Card.Title>
	</Card.Header>
	<Card.Content>
		<Form.Root
			method="POST"
			action="?/createTicket"
			form={data.form}
			schema={formSchema}
			let:config
			{options}
			enctype="multipart/form-data"
			class="flex flex-col gap-4"
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
			<Form.Field {config} name="attachments">
				<Form.Item>
					<Form.Label>Upload files</Form.Label>
					<Form.Input type="file" multiple on:change={handleFileUpload} />

					<Form.Validation />
					<div class="flex flex-wrap gap-2">
						{#each files as file}
							<Badge>
								{file.name}
								<button
									on:click|preventDefault={() => {
										var index = files.indexOf(file);
										if (index !== -1) {
											files.splice(index, 1);
										}

										files = [...files];
									}}
								>
									<X size="16"></X>
								</button>
							</Badge>
						{/each}
					</div>
				</Form.Item>
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
	</Card.Content>
</Card.Root>
