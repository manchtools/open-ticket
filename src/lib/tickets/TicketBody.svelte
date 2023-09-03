<script>
	import { pb } from '$lib/db';
	import { faCloudArrowDown, faXmark } from '@fortawesome/free-solid-svg-icons';
	import TicketReplies from './TicketReplies.svelte';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	export let data;
</script>

<div>
	{#if data.attachments.length > 0}
		<div class="flex gap-2 flex-wrap items-center">
			Attachments:
			{#each data.attachments as attachment}
				<div class="chip variant-filled flex gap-2">
					<a
						class="flex gap-2 items-center"
						href={pb.files.getUrl(data, attachment, { token: data.fileToken, download: 1 })}
						><Fa icon={faCloudArrowDown} />
						{attachment}
					</a>
					{#if $page.url.pathname.startsWith('/admin')}
						<form action="?/removeAttachment" method="POST" class="flex">
							<input value={attachment} hidden name="fileName" />
							<button><Fa icon={faXmark} /></button>
						</form>
					{/if}
				</div>
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
		fileToken={data.fileToken}
	/>
</div>
