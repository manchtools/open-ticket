<script>
	import {
		faListOl,
		faKey,
		faSignOut,
		faUser,
		faUserGear
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<div class="flex flex-col gap-2 flex-wrap mb-4">
	<h1>User Management</h1>
	<div class="flex gap-4">
		<a
			href="/admin/settings/users"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col"
		>
			<Fa icon={faUser} />
			<section>Users</section>
		</a>
		<a
			href="/admin/settings/admins"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col"
		>
			<Fa icon={faUserGear} />
			<section>Admins</section>
		</a>
		<form
			action="?/loggOfEveryone"
			method="POST"
			class="card card-hover p-4 w-fit h-fit items-center flex flex-col variant-filled-error"
		>
			<Fa icon={faSignOut} />
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
			<Fa icon={faListOl} />
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
			<Fa icon={faKey} />
			<section>Auth Provider</section>
		</a>
	</div>
</div>
