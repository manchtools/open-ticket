<script>
	import { ListOrdered, KeyRound, LogOut, Users2, UserCog2 } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-2 flex-wrap mb-4">
	<h1>User Management</h1>
	<div class="flex gap-4">
		<a
			href="/admin/settings/users"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col"
		>
			<Users2 size="32" strokeWidth="1.5" />
			<section>Users</section>
		</a>
		<a
			href="/admin/settings/admins"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col"
		>
			<UserCog2 size="32" strokeWidth="1.5" />
			<section>Admins</section>
		</a>
		<form
			action="?/loggOfEveryone"
			method="POST"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col variant-filled-error"
		>
			<LogOut size="32" strokeWidth="1.5" />
			<button>Log off everyone</button>
		</form>
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
