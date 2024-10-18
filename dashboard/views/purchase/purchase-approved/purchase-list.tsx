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
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import {
  finishOrder,
  FinishOrder,
  FinishOrderItem,
  getDetailItems,
  getPurchaseOrder,
  OrderItemDetail,
  Purchase
} from '../services/services';
import { Checkbox } from '@/components/ui/checkbox';
import { ApiResponse } from '@/config/axios.config';
import toast from 'react-hot-toast';

const PurchaseApproved = () => {
  const [data, setData] = useState<Purchase[]>([]);
  const [currentItems, setCurrentItems] = useState<OrderItemDetail[]>([]);
  const [itemToBeApproved, setItemToBeApproved] = useState<OrderItemDetail[]>(
    []
  );

  const [currentPurchase, setCurrentPurchase] = useState<Purchase>();

  const [loading, setLoading] = useState(true);

  const viewItems = async (purchase: Purchase) => {
    const items = await getDetailItemsLocal(purchase);
    setCurrentItems(items);
  };

  const onChekedItems = async (purchase: Purchase) => {
    const items = await getDetailItemsLocal(purchase);
    setCurrentPurchase(purchase);
    setItemToBeApproved(items);
  };

  const getDetailItemsLocal = async (purchase: Purchase) => {
    const _items = await getDetailItems(purchase.id.toString());
    return _items;
  };

  const handleQuantityChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value, 10);

    const updatedItems = itemToBeApproved.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );

    setItemToBeApproved(updatedItems);
  };

  const handlePriceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value.toString();

    const updatedItems = itemToBeApproved.map((item, i) =>
      i === index ? { ...item, unit_value: newValue } : item
    );

    setItemToBeApproved(updatedItems as OrderItemDetail[]);
  };

  const onRecibeItem = (index: number) => {
    const updatedItems = itemToBeApproved.map((item, i) =>
      i === index ? { ...item, selected: !item.selected || false } : item
    );

    setItemToBeApproved(updatedItems);
  };

  const handleObservations = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;

    const updatedItems = itemToBeApproved.map((item, i) =>
      i === index ? { ...item, observations: newValue || '' } : item
    );

    setItemToBeApproved(updatedItems);
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
        accessorKey: 'date_approved',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Fecha de aprobación' />
        ),
        cell: ({ row }) => {
          const rawDate = row.getValue('date_approved') as string;
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
                onClick={() => onChekedItems(row.original as Purchase)}
              >
                Revisar
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
      const data = await getPurchaseOrder('APROBADO');
      setData(data as Purchase[]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onCloseModal = () => {
    setCurrentItems([]);
    setItemToBeApproved([]);
    setCurrentPurchase(undefined);
  };

  const onFinishCheckOrder = async() => {

    let body: FinishOrder ={supplier_id: '', state:'', items_order:[]};
    body.supplier_id = currentPurchase?.supplier_id.toString() ?? '';
    body.state = 'RECIBIDO';
    body.items_order = itemToBeApproved.map(e=>{ 
      return {
        supply_inventory_supplier_purchase_id:e.supply_inventory_supplier_purchase_id,
        supply_inventory_id: e.supply_inventory_id,
        quantity:e.quantity,
        unit_value:e.unit_value,
        observations:e.observations ?? '',
        state: e.selected ? 'RECIBIDO' : 'NO RECIBIDO'
      }
    })
    const finish = await finishOrder(body,currentPurchase?.id.toString() ?? '') as ApiResponse<any>;
    if(finish?.status){
      onCloseModal();
      getPurchasesList();
      toast.success('Orden de compra recibida correctamente');
    }
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
            <CardTitle>Ordenes de compra aprobadas</CardTitle>
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
                        {item.supply_color_supplier}
                      </td>
                      <td className='px-4 py-3'>{item.quantity}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.state === 'approved'
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
      <Dialog open={itemToBeApproved.length > 0}>
        <DialogContent size='4xl' onClose={onCloseModal}>
          <DialogHeader>
            <DialogTitle className='text-base font-medium text-default-700 '>
              <h2 className='text-lg font-semibold text-gray-800 text-center'>
                Detalles de la Orden de Compras
              </h2>
            </DialogTitle>
          </DialogHeader>

          <div className='text-sm text-default-500  space-y-4 px-4'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='font-semibold'>Item</TableHead>
                    <TableHead className='font-semibold'>
                      Valor unitario
                    </TableHead>
                    <TableHead className='font-semibold'>Cantidad</TableHead>
                    <TableHead className='font-semibold'>
                      Observaciones
                    </TableHead>
                    <TableHead className='font-semibold'>Recibido</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemToBeApproved.map((item, index) => (
                    <TableRow key={item.supply_inventory_id}>
                      <TableCell>
                        {item.supply_type} {item.supply_category}{' '}
                        {item.supply_subcategory} {item.supply_line}{' '}
                        {`${item.width}X${item.heigth}`}
                        {item.supply_color_supplier}
                      </TableCell>
                      <TableCell>
                        <Input
                          type='number'
                          id='unitValue'
                          name='unitValue'
                          value={item.unit_value}
                          onChange={e => handlePriceChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type='number'
                          id='quantity'
                          name='quantity'
                          value={item.quantity}
                          onChange={e => handleQuantityChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type='text'
                          value={item.observations}
                          onChange={e => handleObservations(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          size='lg'
                          id='ck-sm'
                          onCheckedChange={() => onRecibeItem(index)}
                        
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='flex mt-7 justify-center'>
                <Button
                  variant='outline'
                  color='secondary'
                  className='mt'
                  onClick={onFinishCheckOrder}
                >
                  Finalizar revisión
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseApproved;
