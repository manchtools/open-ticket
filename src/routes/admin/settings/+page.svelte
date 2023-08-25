<script>
	import { ListOrdered, KeyRound } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-2 flex-wrap mb-4">
	<h1>User Management</h1>
	<div class="flex gap-4">
		<a
			href="/admin/settings/users"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col gap-4"
		>
			<i class="fa-solid fa-users card-header fa-xl" />
			<section>Users</section>
		</a>
		<a
			href="/admin/settings/admins"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col gap-4"
		>
			<i class="fa-solid fa-users-gear card-header fa-xl" />
			<section>Admins</section>
		</a>
	</div>
	<hr />
	<h1>Ticket Management</h1>
	<div class="flex gap-4">
		<a
			href="/admin/settings/tickets/queues"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col"
		>
			<ListOrdered size="36" strokeWidth="1.5" />
			<section>Queues</section>
		</a>
	</div>
	<hr />
	<h1>System Management</h1>
	<div class="flex gap-4">
		<a
			href="/admin/settings/system/auth-provider"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col"
		>
			<KeyRound size="36" strokeWidth="1.5" />
			<section>Auth Provider</section>
		</a>
	</div>
</div>
