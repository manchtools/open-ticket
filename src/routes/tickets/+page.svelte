<script>
	import { goto } from '$app/navigation';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Table from '$lib/components/ui/table';
	export let data;
</script>

<Table.Root>
	<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Method</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#await data.tickets}
			..loading
			<Skeleton class="h-[20px] w-[100px] rounded-full" />
		{:then tickets}
			{#each tickets.documents as ticket}
				<Table.Row
					on:click={() => {
						goto(`/ticket/${ticket.$id}`);
					}}
				>
					<Table.Cell class="font-medium">{ticket.$id}</Table.Cell>
					<Table.Cell>{ticket.subject}</Table.Cell>
					<Table.Cell>{ticket.$createdAt}</Table.Cell>
					<Table.Cell>{ticket.$updatedAt}</Table.Cell>
					<!-- <Table.Cell class="text-right">{invoice.totalAmount}</Table.Cell> -->
				</Table.Row>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</Table.Body>
</Table.Root>
Copy
