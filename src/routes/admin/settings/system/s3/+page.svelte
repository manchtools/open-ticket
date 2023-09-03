<script>
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data;
</script>

<form action="?/updateBucket" method="POST" class="w-full flex flex-col items-center">
	<h1 class="flex gap-4 items-center">
		S3 configuration <span
			class="chip"
			class:variant-ghost-error={!data.s3Connection}
			class:variant-ghost-success={data.s3Connection}
			>{data.s3Connection ? 'Connected' : 'Connection failed'}</span
		>
	</h1>
	<div class="flex flex-col gap-2 w-[50%]">
		<SlideToggle
			name="enabled"
			active="bg-primary-500"
			size="sm"
			class="w-fit"
			bind:checked={data.s3.enabled}
			on:change={() => {
				data.s3.enabled = data.s3.enabled;
			}}>Enabled</SlideToggle
		>
		{#if data.s3.enabled}
			<label for="bucket">
				<p>Bucket</p>
				<input type="text" value={data.s3.bucket || ''} name="bucket" class="input" required />
			</label>
			<label for="region">
				<p>Region</p>
				<input type="text" value={data.s3.region || ''} name="region" class="input" required />
			</label>
			<label for="endpoint">
				<p>Endpoint</p>
				<input type="url" value={data.s3.endpoint || ''} name="endpoint" class="input" required />
			</label>
			<label for="accessKey">
				<p>Access key</p>
				<input
					type="text"
					value={data.s3.accessKey || ''}
					name="accessKey"
					class="input"
					required
				/>
			</label>
			<label for="secret">
				<p>Secret</p>
				<input type="password" value={data.s3.secret || ''} name="secret" class="input" required />
			</label>
			<SlideToggle
				name="forcePathStyle"
				active="bg-primary-500"
				size="sm"
				class="w-fit"
				bind:checked={data.s3.forcePathStyle}
				on:change={() => {
					data.s3.forcePathStyle = data.s3.forcePathStyle;
				}}>Force path style</SlideToggle
			>
		{/if}
		<button class="btn btn-sm variant-ghost-success">Update</button>
	</div>
</form>
