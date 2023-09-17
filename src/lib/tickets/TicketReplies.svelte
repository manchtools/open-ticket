<script>
	import { afterUpdate } from 'svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	export let replies = [];
	export let fileToken = '';
	export let ticketCreator;
	import { page } from '$app/stores';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { format, parseISO } from 'date-fns';
	import { faCloudArrowDown, faLock } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { pb } from '$lib/db';
	let privateMessage = false;
	let sending = false;
	let currentMessage = '';
	let element;
	let submitButton;
	let files;
	let value = '';
	afterUpdate(() => {
		if (replies) scrollToBottom(element);
	});
	$: if (replies && element) {
		scrollToBottom(element);
	}
	const scrollToBottom = async (node) => {
		if (currentMessage.length !== 0) {
			node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		}
	};
</script>

{#if replies.length > 0}
	<p>Conversation</p>
	<div
		class="max-h-[400px] lg:max-h-[600px] h-fit card flex flex-col gap-3 p-4 overflow-y-auto mb-2"
		bind:this={element}
	>
		{#each replies as reply}
			<div
				class="grid grid-cols-[auto_1fr] gap-2 rounded-lg max-w-[95%] lg:max-w-[70%]"
				class:self-end={$page.data.user?.id === reply.expand?.createdBy?.id}
			>
				<div
					class="card p-4 space-y-2"
					class:variant-ghost-warning={reply.private === true}
					class:variant-ghost-surface={ticketCreator !== reply.expand?.createdBy?.id &&
						reply.private === false}
					class:variant-ghost-success={ticketCreator === reply.expand?.createdBy?.id}
				>
					<header class="flex gap-2 items-center">
						<small>
							{#if $page.data.user?.id !== reply.expand?.createdBy?.id}
								{reply.expand?.createdBy?.name || reply.expand?.createdBy?.email || 'Deleted user'}
							{:else}
								Me
							{/if}
						</small>
						<small class="opacity-50"
							>{format(parseISO(reply.created), 'dd.MM.yyyy HH:mm:ss')}
						</small>
						<small class="opacity-50 ml-auto">
							{#if reply.private}
								<Fa icon={faLock} />
							{/if}
						</small>
					</header>
					<p class=" whitespace-pre-wrap">{reply.body}</p>
					{#if reply.attachments.length > 0}
						<Accordion>
							<AccordionItem>
								<svelte:fragment slot="summary"><small> Attachments</small></svelte:fragment>
								<svelte:fragment slot="content">
									<div class="flex flex-col gap-1">
										{#each reply.attachments as attachment}
											<a
												class="chip variant-filled flex w-fit gap-2"
												target="_blank"
												href={pb.files.getUrl(reply, attachment, { token: fileToken, download: 1 })}
												>{attachment} <Fa icon={faCloudArrowDown} /></a
											>
										{/each}
									</div>
								</svelte:fragment>
							</AccordionItem>
						</Accordion>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<h3>Start a new conversation!</h3>
{/if}

<form action={'?/addReply'} method="POST" class="flex flex-col gap-2" enctype="multipart/form-data">
	<span class="rounded-container-token input-group input-group-divider grid-cols-[1fr_auto_auto]">
		<textarea
			bind:value={currentMessage}
			class="bg-transparent border-0 ring-0"
			name="body"
			placeholder="Write a message..."
			rows="1"
			maxlength="20000"
			on:keydown={(e) => {
				if (e.key === 'Enter' && e.shiftKey) {
					submitButton.click();
				}
			}}
		/>
		<span>
			{#if currentMessage.length >= 17000}
				{currentMessage.length}/20000
			{/if}
		</span>

		<button
			class="variant-filled-primary"
			disabled={sending || currentMessage.length === 0}
			bind:this={submitButton}
		>
			{#if sending}
				<ProgressRadial
					stroke={200}
					meter="stroke-primary-800"
					track="stroke-primary-800/30"
					width="w-6"
				/>
			{:else}
				Send
			{/if}
		</button>
	</span>
	<FileDropzone name="attachments" multiple bind:files />
	{#if files}
		<div class="flex gap-2 flex-wrap">
			{#each files as file}
				<span class="chip variant-filled">{file.name}</span>
			{/each}
		</div>
	{/if}
	<span class="flex justify-end">
		{#if $page.url.pathname?.startsWith('/admin')}
			<SlideToggle name="visability" active="bg-primary-500" size="sm" bind:checked={privateMessage}
				>Add as private note</SlideToggle
			>
		{/if}
	</span>
</form>
