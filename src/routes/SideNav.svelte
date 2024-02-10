<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu, TicketPlus, Rows3, Dot } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import '../app.pcss';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
</script>

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
					{#if $page.data.user.type === 'agent'}
						<Separator class="my-4" />
						<h1 class="text-xl">Admin Area</h1>
						<section class="ml-4 mt-2 flex flex-col items-start">
							<h2 class="text-lg">Users</h2>
							<Button variant="link" builders={[builder]} href="/admin/user/agents" class="gap-2">
								<Dot></Dot>
								<p class:underline={$page.route.id === '/admin/user/agents'}>Agents</p>
							</Button>
							<Button variant="link" builders={[builder]} href="/admin/user/users" class="gap-2">
								<Dot></Dot>
								<p class:underline={$page.route.id === '/admin/user/users'}>User</p>
							</Button>
						</section>
						<section class="ml-4 mt-2 flex flex-col items-start">
							<h2 class="text-lg">Manage queues</h2>
							<Button variant="link" builders={[builder]} href="/admin/queues" class="gap-2">
								<Dot></Dot>
								<p class:underline={$page.route.id === '/admin/queues'}>All queues</p>
							</Button>
						</section>
						<section class="ml-4 mt-2 flex flex-col items-start">
							<h2 class="text-lg">Manage system</h2>
							<Button variant="link" builders={[builder]} href="/admin/system/auth" class="gap-2">
								<Dot></Dot>
								<p class:underline={$page.route.id === '/admin/system/auth'}>Auth Provider</p>
							</Button>
							<Button variant="link" builders={[builder]} href="/admin/system/s3" class="gap-2">
								<Dot></Dot>
								<p class:underline={$page.route.id === '/admin/system/s3'}>S3 Configuration</p>
							</Button>
						</section>
					{/if}
				</Sheet.Close>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
