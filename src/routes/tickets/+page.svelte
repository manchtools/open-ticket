<script>
	import TicketsTable from './tickets-table.svelte';

	export let data;
</script>

{#await data.streamed.tickets}
	...Loading
{:then tickets}
	<TicketsTable data={tickets}></TicketsTable>
{/await}
