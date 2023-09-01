<script>
	import { pb } from '$lib/db';
	import { faCloudArrowDown, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
	import TicketReplies from './TicketReplies.svelte';
	import Fa from 'svelte-fa';
	export let data;
	console.log(data);
</script>

<div>
	{#if data.attachments}
		<div class="flex gap-2 flex-wrap items-center">
			Attachments:
			{#each data.attachments as attachment}
				<a
					class="chip variant-filled flex gap-2"
					href={pb.files.getUrl(data, attachment, { token: data.fileToken, download: 1 })}
					>{attachment} <Fa icon={faCloudArrowDown} /></a
				>
			{/each}
		</div>
		<hr class="my-2" />
	{/if}
	<h4 class=" whitespace-pre-wrap">
		{data.body}
	</h4>
	<hr class="my-2" />
	<TicketReplies
		replies={data.expand.replies}
		ticketId={data.id}
		ticketCreator={data.expand?.createdBy?.id}
	/>
</div>
