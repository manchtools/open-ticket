<script>
	import TicketBody from './TicketBody.svelte';
	import TicketHead from './TicketHead.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/db';

	export let data;
	onMount(() => {
		pb.collection('tickets').subscribe(data.id, async (e) => {
			let tmp = await pb.collection('tickets').getOne(e.record.id, {
				expand: 'replies,replies.createdBy,agent,createdBy,updatedBy,queue'
			});

			let message = '';
			if (tmp.expand.replies.length !== (data.expand?.replies?.length || [])) {
				message = message + 'replied to this ticket';
			}
			if (tmp.status !== data.status) {
				if (message.length >= 1) {
					message += ', and ';
				}
				message += `updated status to <span class="underline">${tmp.status}</span>`;
			}
			if (tmp.agent != data.agent) {
				if (message.length >= 1) {
					message += ', and ';
				}
				if (tmp.expand.agent?.email) {
					message += `updated agent to <span class="underline">${tmp.expand.agent?.email}</span>`;
				}
				if (!tmp.expand.agent?.email) {
					message += `unassigned agent`;
				}
			}
			if (tmp.queue != data.queue) {
				message += `updated queue`;
			}
			data = tmp;
		});
	});
	onDestroy(() => {
		pb.collection('tickets').unsubscribe(data.id);
	});
</script>

<div class="card p-4">
	<TicketHead {data} />
	<hr class="my-2" />
	<TicketBody {data} />
</div>
