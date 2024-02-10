<script>
	import AppShell from '$lib/components/ui/appshell/appshell.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LogOut } from 'lucide-svelte';
	export let data;

	import '../app.pcss';
	import pb from '$lib';

	import { page } from '$app/stores';
	import SideNav from './SideNav.svelte';
</script>

<Toaster richColors closeButton visibleToasts={8} />

<AppShell>
	<svelte:fragment slot="header">
		{#if $page.route.id !== '/auth/login' && $page.route.id !== '/auth/logout'}
			<div class="flex w-full border-b p-4">
				<SideNav></SideNav>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="ml-auto"
						><Avatar.Root>
							<Avatar.Image
								src={pb.files.getUrl(data.user, data.user.avatar, { thumb: '50x50' })}
								alt="{data.user.email} profile picture"
							/>
							<Avatar.Fallback>{data.user.email.slice(0, 2).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root></DropdownMenu.Trigger
					>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Account: {data.user.email}</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item href="/account">Profile</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								href="/auth/logout"
								class="bg-destructive text-destructive-foreground data-[highlighted]:bg-destructive/80"
							>
								<LogOut class="mr-2 h-4 w-4"></LogOut>
								Logout</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/if}
	</svelte:fragment>
	<div class="h-full w-full p-4">
		<slot />
	</div>
</AppShell>
