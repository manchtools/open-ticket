<script>
	import AppShell from '$lib/components/ui/appshell/appshell.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Menu, TicketPlus, Rows3, Dot, LogOut } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	export let data;

	import '../app.pcss';
	import pb from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
</script>

<Toaster richColors closeButton visibleToasts={8} />

<AppShell>
	<svelte:fragment slot="header">
		{#if $page.route.id !== '/auth/login' && $page.route.id !== '/auth/logout'}
			<div class="flex w-full border-b p-4">
				<Sheet.Root>
					<Sheet.Trigger><Menu size="28" /></Sheet.Trigger>
					<Sheet.Content side="left">
						<Sheet.Header>
							<Sheet.Title>Pages</Sheet.Title>
							<Sheet.Description class="flex flex-col items-start">
								<Sheet.Close asChild let:builder>
									<Button variant="link" builders={[builder]} href="/ticket" class="gap-2">
										<TicketPlus size="18" />
										<p class:underline={$page.route.id === '/ticket'}>Create new ticket</p>
									</Button>
									<Button variant="link" builders={[builder]} href="/tickets" class="gap-2">
										<Rows3 size="18" />
										<p class:underline={$page.route.id === '/tickets'}>All tickets</p>
									</Button>
									{#if data.user.type === 'agent'}
										<Separator class="my-4" />
										<h1 class="text-xl">Admin Area</h1>
										<section class="ml-4 mt-2 flex flex-col items-start">
											<h2 class="text-lg">Users</h2>
											<Button
												variant="link"
												builders={[builder]}
												href="/admin/user/agents"
												class="gap-2"
											>
												<Dot></Dot>
												<p class:underline={$page.route.id === '/admin/user/agents'}>Agents</p>
											</Button>
											<Button
												variant="link"
												builders={[builder]}
												href="/admin/user/user"
												class="gap-2"
											>
												<Dot></Dot>
												<p class:underline={$page.route.id === '/admin/user/user'}>User</p>
											</Button>
										</section>
										<section class="ml-4 mt-2 flex flex-col items-start">
											<h2 class="text-lg">Manage queues</h2>
											<Button
												variant="link"
												builders={[builder]}
												href="/admin/queues"
												class="gap-2"
											>
												<Dot></Dot>
												<p class:underline={$page.route.id === '/admin/queues'}>All queues</p>
											</Button>
										</section>
										<section class="ml-4 mt-2 flex flex-col items-start">
											<h2 class="text-lg">Manage system</h2>
											<Button
												variant="link"
												builders={[builder]}
												href="/admin/system/auth"
												class="gap-2"
											>
												<Dot></Dot>
												<p class:underline={$page.route.id === '/admin/system/auth'}>
													Auth Provider
												</p>
											</Button>
											<Button
												variant="link"
												builders={[builder]}
												href="/admin/system/s3"
												class="gap-2"
											>
												<Dot></Dot>
												<p class:underline={$page.route.id === '/admin/system/s3'}>
													S3 Configuration
												</p>
											</Button>
										</section>
									{/if}
								</Sheet.Close>
							</Sheet.Description>
						</Sheet.Header>
					</Sheet.Content>
				</Sheet.Root>
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
