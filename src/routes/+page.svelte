<script>
	import { faTicket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<div class="flex gap-4 flex-wrap mb-4">
	<a href="/ticket" class="card card-hover p-4 w-fit h-fit items-center flex flex-col">
		<Fa icon={faTicket} />
		<section>New ticket</section>
	</a>
</div>
