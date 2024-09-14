'use client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';
import { DataRows, fakeData } from './data';



const CollapsibleTable = () => {
  

  const columnsdt: ColumnDef<DataRows>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-0.5'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Nombre' />
      ),
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'nit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='NIT/Documento' />
      ),
      cell: ({ row }) => <div>{row.getValue('nit')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'country',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='País' />
      ),
      cell: ({ row }) => <div>{row.getValue('country')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />
    }
  ];

  return (
    <>
      <Card className='py-4 px-2'>
        <DataTable data={fakeData} columns={columnsdt} />
      </Card>
    </>
  );
};

export default CollapsibleTable;
