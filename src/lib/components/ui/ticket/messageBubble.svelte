<script>
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { format, parseISO } from 'date-fns';
	export let reply;

	let classes = '';
	if ($page.data.user.id === reply.createdBy) {
		classes = 'bg-green-400 ml-auto';
	} else if (reply.private === true) {
		classes = 'bg-orange-400';
	} else {
		classes = 'bg-muted';
	}
	console.log(classes);
</script>

<Card.Root class="w-5/6 max-w-lg bg-opacity-10 {classes}">
	<Card.Header class="flex flex-row justify-start space-y-0 px-4 py-2">
		<p class="mr-4">
			{reply.expand?.createdBy?.name || reply.expand?.createdBy?.email || 'Deleted'}
		</p>

		<p class="ml-auto">
			{format(parseISO(reply.created), 'yyyy-MM-dd HH:mm')}
		</p>
	</Card.Header>
	<hr />
	<Card.Content class="whitespace-pre-wrap px-4 py-2">
		{reply.body}
	</Card.Content>
</Card.Root>
