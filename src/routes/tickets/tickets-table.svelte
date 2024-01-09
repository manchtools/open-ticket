<script>
	export let data;
	let tickets = data.items;
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { format, parseISO } from 'date-fns';
	import { readable, writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Expand } from 'lucide-svelte';

	const table = createTable(readable(tickets), {
		page: addPagination({
			initialPageIndex: data.page,
			initialPageSize: data.perPage,
			serverSide: true,
			serverItemCount: writable(data.totalItems)
		})
	});
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
		}),
		table.column({
			accessor: 'subject',
			header: 'Subject'
		}),
		table.column({
			accessor: 'body',
			header: 'Message'
		}),
		table.column({
			accessor: ({ expand }) => {
				if (expand.createdBy) {
					return expand.createdBy;
				} else {
					return 'User does not exist';
				}
			},
			header: 'Created by',
			cell: ({ value: { name, email } }) => {
				if (name) {
					return name;
				} else {
					return email;
				}
			}
		}),
		table.column({
			accessor: ({ expand }) => {
				return expand.queue;
			},
			header: 'Queue',
			cell: ({ value }) => {
				if (value) {
					return value.name;
				} else {
					return 'Not assigned';
				}
			}
		}),
		table.column({
			accessor: ({ expand }) => {
				expand['(ticket)'];
			},
			header: 'Reply count',
			cell: ({ value }) => {
				return value.length;
			}
		}),
		table.column({
			accessor: 'created',
			header: 'Created at',
			cell: ({ value }) => {
				return format(parseISO(value), 'yyyy-MM-dd HH:mm');
			}
		}),
		table.column({
			accessor: 'updated',
			header: 'Updated at',
			cell: ({ value }) => {
				return format(parseISO(value), 'yyyy-MM-dd HH:mm');
			}
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
