<script>
	export let data../$types.js;
	import { SlideToggle } from '@skeletonlabs/skeleton';
	function extractName(string) {
		const tmp = string.split('Auth')[0];
		return tmp.charAt(0).toUpperCase() + tmp.slice(1);
	}
</script>

<h1>Auth Providers</h1>
<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
	{#each Object.entries(data.settings.authProvider) as [name, payload]}
		<form
			action="?/updateOauthProvider&name={name}"
			method="POST"
			class="flex flex-col gap-2 p-4 card h-fit"
		>
			<h3>
				<i
					class="fa-brands fa-lg fa-{name.includes('oidc')
						? 'openid'
						: name.includes('git') && !name.includes('gitlab')
						? 'git-alt'
						: extractName(name).toLowerCase()}"
				/>
				{extractName(name)}
			</h3>
			<div class="flex flex-col gap-2">
				<SlideToggle
					name="enabled"
					active="bg-primary-500"
					size="sm"
					bind:checked={payload.enabled}
					on:change={() => {
						payload.enabled = payload.enabled;
					}}>Enabled</SlideToggle
				>
				{#if payload.enabled}
					<label for="{name}_{payload.clientId}">
						<p>* Client ID</p>
						<input type="text" value={payload.clientId} name="clientId" class="input" required />
					</label>
					<label for="{name}_{payload.clientSecret}">
						<p>* Client Secret</p>
						<input
							type="password"
							value={payload.clientSecret}
							name="clientSecret"
							class="input"
							required
						/>
					</label>
					{#if name.includes('git') || name.includes('oidc') || name.includes('microsoft')}
						<h3>Additional Endpoints</h3>
						<label for="{name}_{payload.authUrl}">
							Auth URL
							<input
								type="url"
								value={payload.authUrl}
								name="authUrl"
								class="input"
								required={name.includes('microsoft')}
							/>
						</label>
						<label for="{name}_{payload.tokenUrl}">
							Token URL
							<input
								type="url"
								value={payload.tokenUrl}
								name="tokenUrl"
								class="input"
								required={name.includes('microsoft')}
							/>
						</label>
						{#if !name.includes('microsoft')}
							<label for="{name}_{payload.userApiUrl}">
								User API URL
								<input type="url" value={payload.userApiUrl} name="userApiUrl" class="input" />
							</label>
						{/if}
					{/if}
					<button class="btn btn-sm variant-ghost-success">Update</button>
				{/if}
			</div>
		</form>
	{/each}
</div>
