<script>
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { formSchema } from './schema';
	import { Loader2 } from 'lucide-svelte';
	let loading = false;
	const options = {
		onSubmit: (e) => {
			loading = true;
		},
		onResult: (e) => {
			loading = false;
		}
	};
</script>

<Card.Root class="w-2/3">
	<Card.Header>
		<Card.Title>Sign in</Card.Title>
		<!-- <Card.Description>Card Description</Card.Description> -->
	</Card.Header>
	{#await data.streamed.authMethods}
		...Loading
	{:then authMethods}
		<Card.Content>
			{#if authMethods.emailPassword || authMethods.usernamePassword}
				<Form.Root
					method="POST"
					action="?/login"
					form={data.form}
					schema={formSchema}
					let:config
					{options}
				>
					<Form.Field {config} name="account">
						<Form.Item>
							<Form.Label>{authMethods.emailPassword ? 'Email' : 'Username'}</Form.Label>
							<Form.Input />

							<Form.Validation />
						</Form.Item>
					</Form.Field>
					<Form.Field {config} name="password">
						<Form.Item>
							<Form.Label>Password</Form.Label>
							<Form.Input type="password" />

							<Form.Validation />
						</Form.Item>
					</Form.Field>
					<Form.Button class="w-full" disabled={loading}>
						{#if loading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Login</Form.Button
					>
				</Form.Root>
			{/if}
		</Card.Content>
		{#if authMethods.authProviders.length > 0}
			<Card.Footer class="flex w-full flex-col gap-4">
				<div class="relative w-full">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<div class="flex w-full flex-col gap-2">
					{#each authMethods.authProviders as method}
						<Button variant="outline">
							<p>
								Sign in with <span class="uppercase">
									{method.name}
								</span>
							</p>
						</Button>
					{/each}
				</div>
			</Card.Footer>
		{/if}
	{/await}
</Card.Root>
