'use client';
import { useEffect, useState } from 'react';

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';

import { Master } from '@/views/types/master';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

const data = [{ name: 'Orden #1' }, { name: 'Orden #2' }];

export const columns: ColumnDef<Master>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Órden' />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'items',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Items' />
    ),
    cell: ({ row }) => (
      <Button
        size='icon'
        variant='outline'
        className=' h-7 w-7'
        color='secondary'
      >
        <Icon icon='heroicons:eye' className=' h-4 w-4  ' />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'action',
    cell: ({ row }) => (
      <div className='flex w-full'>
        <Button variant='outline' color='secondary' className='mr-2'>
          Aprobar
        </Button>
        <Button variant='outline' color='destructive' className='ml-4'>
          Rechazar
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  }
];

const PurchaseList = () => {
  //const [data, setData] = useState<Master[] | []>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true);
    }
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Óden de compra</BreadcrumbItem>
        <BreadcrumbItem>Listado</BreadcrumbItem>
      </Breadcrumbs>
      <div className='w-full mt-4'>
        <Card>
          <CardHeader>
            <CardTitle>Aprobar/Rechazar Órdenes de Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={data} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseList;
