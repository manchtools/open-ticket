<script>
	import { afterUpdate } from 'svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	export let replies;
	export let ticketId;
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { handleAppwriteError } from '$lib/helpers';
	let sending = false;
	let currentMessage = '';
	let element;
	afterUpdate(() => {
		if (replies) scrollToBottom(element);
	});
	$: if (replies && element) {
		scrollToBottom(element);
	}
	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<div class="h-[600px] card flex flex-col gap-3 p-4 overflow-y-auto mb-2" bind:this={element}>
	{#each replies as reply}
		<div
			class="grid grid-cols-[auto_1fr] gap-2 rounded-lg max-w-[70%]"
			class:self-end={$page.data.user.$id === reply.createdBy?.$id}
		>
			<div
				class="card p-4 space-y-2"
				class:variant-ghost-success={$page.data.user.$id === reply.createdBy?.$id}
			>
				<header class="flex justify-between items-center gap-2">
					<small class="text-surface-300">
						{#if $page.data.user.$id !== reply.createdBy?.$id}
							{reply.createdBy.name || reply.createdBy.email}
						{:else}
							Me
						{/if}
					</small>
					<small class="opacity-50">{reply.$createdAt}</small>
				</header>
				<p class=" whitespace-pre-wrap">{reply.body}</p>
			</div>
		</div>
	{/each}
</div>

<form
	action={`/ticket/${ticketId}?/addReply`}
	method="POST"
	class="flex flex-col gap-2"
	use:enhance={({ formElement, formData, cancel }) => {
		sending = true;
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted

		return async ({ result }) => {
			// `result` is an `ActionResult` object
			if (result.status === 200) {
				replies = [...replies, result.data];
				currentMessage = '';
			}
			if (result.status === 400) {
				toastStore.trigger({ message: result.error.message, background: 'variant-filled-error' });
			}
			sending = false;
		};
	}}
>
	<span class="rounded-container-token input-group input-group-divider grid-cols-[1fr_auto_auto]">
		<textarea
			bind:value={currentMessage}
			class="bg-transparent border-0 ring-0"
			name="body"
			placeholder="Write a message..."
			rows="1"
			maxlength="20000"
		/>
		<span>
			{#if currentMessage.length >= 17000}
				{currentMessage.length}/20000
			{/if}
		</span>

		<button class="variant-filled-primary" disabled={sending || currentMessage.length === 0}>
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
	<span class="flex justify-end">
		{#if $page.route.id?.startsWith('/admin')}
			<SlideToggle name="visability" active="bg-primary-500" size="sm"
				>Add as private note</SlideToggle
			>
		{/if}
	</span>
</form>
