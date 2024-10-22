'use client';
import { useEffect, useMemo, useState } from 'react';

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { es } from 'date-fns/locale';

import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import {
  approveOrNotOrder,
  getDetailItems,
  getPurchaseOrder,
  OrderItemDetail,
  Purchase,
  PurchaseOrderItem
} from '../services/services';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PurchaseList = () => {
  const [data, setData] = useState<Purchase[]>([]);
  const [currentItems, setCurrentItems] = useState<OrderItemDetail[]>([]);
  const [itemToBeApproved, setItemToBeApproved] = useState<{
    id: string;
    status: string;
    observation?: string;
  }>();

  const [loading, setLoading] = useState(true);

  const viewItems = async (purchase: Purchase) => {
    const _items = await getDetailItems(purchase.id.toString());
    setCurrentItems(_items);
  };

  const onApproveOrNot = async (
    id: string,
    status: string,
    observation?: string
  ) => {
    setItemToBeApproved({ id, status });
    if (observation) {
      const orderResult = await approveOrNotOrder(id, status, observation);
      onCloseModal();
      getPurchasesList();
    }
  };

  const columns: ColumnDef<Purchase>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Código' />
        ),
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: 'name_supplier',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Proveedor' />
        ),
        cell: ({ row }) => <div>{row.getValue('name_supplier')}</div>,
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: 'created_at',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Fecha de creación' />
        ),
        cell: ({ row }) => {
          const rawDate = row.getValue('created_at') as string;
          const formattedDate = format(
            new Date(rawDate),
            "dd 'de' MMMM 'de' yyyy",
            { locale: es }
          );
          return <div>{formattedDate}</div>;
        },
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: 'purchase_order_items',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Cantidad de insumos' />
        ),
        cell: ({ row }) => {
          const purchaseOrderItems = row.getValue(
            'purchase_order_items'
          ) as any[];
          return <div>{purchaseOrderItems.length}</div>;
        },
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
            className='h-7 w-7'
            color='secondary'
            onClick={() => viewItems(row.original as Purchase)}
          >
            <Icon icon='heroicons:eye' className='h-4 w-4' />
          </Button>
        ),
        enableSorting: false,
        enableHiding: false
      },
      {
        id: 'action',
        cell: ({ row }) => {
          const id = row.getValue('id') as string;
          return (
            <div className='flex w-full'>
              <Button
                variant='outline'
                color='secondary'
                className='mr-2'
                onClick={() => onApproveOrNot(id, 'APROBADO')}
              >
                Aprobar
              </Button>
              <Button
                variant='outline'
                color='destructive'
                className='ml-4'
                onClick={() => onApproveOrNot(id, 'NO APROBADO')}
              >
                Rechazar
              </Button>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false
      }
    ];
  }, []);

  useEffect(() => {
    getPurchasesList();
  }, []);

  const getPurchasesList = async () => {
    try {
      setLoading(true);
      const data = await getPurchaseOrder('ORDEN CREADA');
      setData(data as Purchase[]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onCloseModal = () => {
    setCurrentItems([]);
    setItemToBeApproved(undefined);
  };

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

      {/* Modal items */}
      <Dialog open={currentItems.length > 0}>
        <DialogContent size='3xl' onClose={onCloseModal}>
          <DialogHeader>
            <DialogTitle className='text-base font-medium text-default-700 '>
              <h2 className='text-lg font-semibold text-gray-800 text-center'>
                Detalles de la Orden de Compra
              </h2>
            </DialogTitle>
          </DialogHeader>

          <div className='text-sm text-default-500  space-y-4 px-4'>
            <div className='overflow-x-auto'>
              <table className='min-w-full table-auto'>
                <thead>
                  <tr className='bg-gray-100 text-left text-sm uppercase text-gray-600'>
                    <th className='px-4 py-2'>Código</th>
                    <th className='px-4 py-2'>Nombre</th>
                    <th className='px-4 py-2'>Unidad de medida</th>
                    <th className='px-4 py-2'>Color Proveedor</th>
                    <th className='px-4 py-2'>Cantidad</th>
                    <th className='px-4 py-2'>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(item => (
                    <tr
                      key={item.supply_inventory_id}
                      className='border-b hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-4 py-3'>{item.supply_inventory_id}</td>
                      <td className='px-4 py-3'>
                        {item.supply_type} {item.supply_category}{' '}
                        {item.supply_subcategory} {item.supply_line}{' '}
                        {`${item.width}X${item.heigth} ${item.unit_value}`}
                        {item.supply_color}
                      </td>
                      <td className='px-4 py-3'>
                        {item.supply_unit_of_measure}
                      </td>
                      <td className='px-4 py-3'>
                        {item.supply_color_supplier}
                      </td>
                      <td className='px-4 py-3'>{item.quantity}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.state === 'RECIBIDO'
                              ? 'bg-green-100 text-green-700'
                              : item.state === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {item.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Modal approved or not */}
      <AlertDialog open={itemToBeApproved?.id !== undefined}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemToBeApproved?.status === 'NO APROBADO'
                ? 'Rechazar orden de compra'
                : 'Aprobar orden de compra'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {itemToBeApproved?.status === 'NO APROBADO'
                ? '¿Estás seguro de que deseas rechazar este ítem de la orden de compra?'
                : '¿Estás seguro de que deseas aprobar este ítem de la orden de compra?'}

              <div className='mt-4'>
                <Label className='mb-2'>Observaciones</Label>
                <Textarea
                  placeholder='Observaciones...'
                  id='observations'
                  value={itemToBeApproved?.observation}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    if (itemToBeApproved?.id) {
                      setItemToBeApproved({
                        ...itemToBeApproved,
                        observation: e.target.value
                      });
                    }
                  }}
                  rows={4}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className='bg-destructive'
              onClick={onCloseModal}
            >
              Cancelar
            </AlertDialogCancel>
            {/* <AlertDialogAction
              className={`${
                itemToBeApproved?.status === 'NO APROBADO'
                  ? 'bg-secondary'
                  : 'bg-primary'
              }`}
            > */}
            <Button
              size='md'
              variant='outline'
              className='h-10'
              color='secondary'
              onClick={() =>
                itemToBeApproved?.status === 'NO APROBADO'
                  ? onApproveOrNot(
                      itemToBeApproved.id,
                      itemToBeApproved.status,
                      itemToBeApproved.observation ?? 'N/A'
                    )
                  : onApproveOrNot(
                      itemToBeApproved?.id ?? '',
                      itemToBeApproved?.status ?? '',
                      itemToBeApproved?.observation ?? 'N/A'
                    )
              }
            >
              {itemToBeApproved?.status === 'NO APROBADO'
                ? 'Rechazar'
                : 'Aprobar'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PurchaseList;
