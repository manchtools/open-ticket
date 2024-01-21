<script>
	export let data;
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Trash } from 'lucide-svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { ChevronsUpDown } from 'lucide-svelte';
	const types = {
		agent: 'Agent',
		limited_agent: 'Limited agent',
		user: 'User'
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>My Profile</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="email">Username</Label>
			<Input type="email" id="email" value={data.user.username} disabled />
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="email">Email</Label>
			<Input type="email" id="email" value={data.user.email} disabled />
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="email">Type</Label>
			<Input type="email" id="email" value={types[data.user.type]} disabled />
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Collapsible.Root>
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm" class="w-9 gap-4 p-2">
						<Label for="email">Notification Preferences</Label>
						<ChevronsUpDown class="h-4 w-4" />
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Trigger></Collapsible.Trigger>

				<Collapsible.Content class="flex flex-col gap-2">
					{#each data.user.notificationPrefs as notificationPref, index}
						<div class=" flex items-center justify-between rounded-md border p-2">
							<p>
								{notificationPref}
							</p>
							<Button
								size="icon"
								variant="outline"
								on:click={() => {
									data.user.notificationPrefs.splice(index, 1);
									// console.log(data.user.notificationPrefs);
									data.user.notificationPrefs = [...data.user.notificationPrefs];
								}}
							>
								<Trash size="16"></Trash>
							</Button>
						</div>
					{/each}
					<Button type="submit">Update</Button>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	</Card.Content>
</Card.Root>
