<script>
	import { goto } from '$app/navigation';
	import { drawerBaseSettings } from '$lib/helpers.js';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let data;

	let page = {
		offset: data.users.page || 1,
		limit: data.users.perPage || 25,
		size: data.users.totalItems,
		amounts: []
	};
	function onPageChange(e) {
		goto(`?offset=${e.detail + 1}`, { invalidateAll: true });
	}
</script>

<div class="flex gap-2 flex-col">
	<button
		class="btn variant-ghost-success self-end flex gap-2"
		on:click={() => {
			let settings = drawerBaseSettings;
			settings['type'] = 'new_user';
			drawerStore.open(settings);
		}}><i class="fa-solid fa-plus" />Add User</button
	>
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th class="flex items-center justify-between">Joined</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users.items as user}
				<tr
					on:click={() => {
						let settings = drawerBaseSettings;
						settings['type'] = 'user';
						settings['data'] = user;
						drawerStore.open(settings);
					}}
				>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.created}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<small class="self-end">Total admins: {data.users.totalItems}</small>
	<Paginator
		bind:settings={page}
		showNumerals={true}
		maxNumerals={1}
		on:page={onPageChange}
		amountText="Users"
		controlVariant="variant-filled-surface"
		class="self-center"
	/>
</div>
