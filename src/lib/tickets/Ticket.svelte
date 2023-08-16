<script>
	import TicketBody from './TicketBody.svelte';
	import TicketHead from './TicketHead.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/db';

	export let data;
	console.log(data);
	onMount(() => {
		pb.collection('tickets').subscribe(data.id, async (e) => {
			let tmp = await pb
				.collection('tickets')
				.getOne(e.record.id, { expand: 'replies,replies.createdBy,agent,createdBy,updatedBy' });

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
			data = tmp;

			if (e.action === 'update' && e.record?.updatedBy !== pb.authStore.model.id) {
				toastStore.trigger({
					message: `<b class="underline">${tmp.expand.updatedBy.email}</b> ${message}.`,
					background: 'variant-ghost-warning'
				});
			}
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
