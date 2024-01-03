<script>
	import { databases, functions, storage } from '$lib/appwrite';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	async function submit(data) {
		const { subject, body } = Object.fromEntries(data);
		const files = document.getElementById('file').files;
		const filePromises = [];
		const ticket = await functions.createExecution(
			'createTicket',
			JSON.stringify({ subject, body }),
			false
		);
		const responseData = JSON.parse(ticket.responseBody);
		for (const file of files) {
			filePromises.push(storage.createFile(responseData.$id, 'unique()', file));
		}

		// Promise.all(filePromises)
		// 	.then(() => {})
		// 	.catch(() => {});
		goto(`/ticket/${responseData.$id}`);
	}
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	use:enhance={({ formData, action, cancel }) => {
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted
		submit(formData);
		cancel();
		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
	}}
>
	<input type="text" name="subject" id="subject" />
	<input type="text" name="body" id="subject" />
	<input type="file" name="file" id="file" multiple />
	<button type="submit">Send </button>
</form>
