<script>
	import { badgeVariants } from '$lib/components/ui/badge';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Download } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	export let ticket;
	import Button from '../button/button.svelte';
	import { onMount } from 'svelte';
	import pb from '$lib';
	import { isTokenExpired } from 'pocketbase';
	let filetoken;

	onMount(async () => {
		filetoken = await pb.files.getToken();
	});
</script>

<div class="flex flex-wrap gap-2">
	{#each ticket.attachments as file}
		<Dialog.Root
			onOpenChange={async (e) => {
				if (e === true) {
					if (isTokenExpired(filetoken)) {
						filetoken = await pb.files.getToken();
					}
				}
			}}
		>
			<Dialog.Trigger class={badgeVariants({ variant: 'default' })}>
				<Avatar.Root class="m-0 mr-2 size-6 p-0">
					<Avatar.Image
						src={pb.files.getUrl(ticket, file, { token: filetoken, thumb: '50x50' })}
						alt="@shadcn"
					/>
					<Avatar.Fallback>N/A</Avatar.Fallback>
				</Avatar.Root>

				{file}</Dialog.Trigger
			>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title class="flex items-center gap-2">
						<p class="break-all">
							{file}
						</p>
						<Button
							href={pb.files.getUrl(ticket, file, { download: true })}
							size="icon"
							variant="ghost"><Download /></Button
						></Dialog.Title
					>
					<Dialog.Description>
						<img src={pb.files.getUrl(ticket, file, { token: filetoken })} alt="" />
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</div>
