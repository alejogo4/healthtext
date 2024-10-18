'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FC, useState, useEffect } from 'react';

import SelectReact from 'react-select';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { ColumnDef } from '@tanstack/react-table';
import { Controller, useForm } from 'react-hook-form';
import { data } from './data';
import {
  createSupplyPurchase,
  listCategory,
  listColor,
  listColorCloth,
  listColorSupplier,
  listLinea,
  listSubCategory,
  listSupplier,
  ListSuppliesI,
  listTypeSupply,
  Order,
  searchSupplies
} from '../services/services';
import { arrayToReactSelect } from '@/util/arrayToSelect';
import { toast } from 'react-hot-toast';

type Props = {};

export interface ContactInfo {
  name_contact: string;
  extension: string;
  phone: string;
  mobile: string;
  email_contact: string;
  alternate_email: string;
  job_title: string;
}

export interface FormType {
  supplier: { value: string; label: string };
  supply_type: { value: string; label: string };
  category?: { value: string; label: string };
  subCategory?: { value: string; label: string };
  line?: { value: string; label: string };
  color?: { value: string; label: string };
}

interface Task {
  id: string;
  description?: string;
  status?: string;
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];

const PurchaseOrder: FC<Props> = () => {
  const [supplierList, setSupplierList] = useState<any[]>([]);
  const [supplyType, setSupplyType] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubcategories] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  const [listSuppliesTable, setListSuppliesTable] = useState<ListSuppliesI[]>(
    []
  );

  const [listSuppliesAdded, setListSuppliesAddedd] = useState<ListSuppliesI[]>(
    []
  );

  const [filter, setFilter] = useState<FormType>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [supplier, typeSupply] = await Promise.all([
          listSupplier(),
          listTypeSupply()
        ]);

        setSupplierList(supplier);
        setSupplyType(typeSupply);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormType) => {
    setFilter(data);
    const supplies = await searchSupplies({
      supplier_id: data.supplier.value,
      supply_type_id: data.supply_type.value,
      supply_category_id: data.category?.value || '',
      supply_subcategory_id: data.subCategory?.value || '',
      supply_line_id: data.line?.value || '',
      supply_color_id: data.color?.value || ''
    });

    setListSuppliesTable(supplies);
  };

  const form = useForm<FormType>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    ...formMethods
  } = form;

  const { control } = form;

  const supplyTypeW = watch('supply_type');
  const supplierW = watch('supplier');

  const onChangeTypeSupply = async (selectedOption: {
    value?: string;
    label?: string;
  }) => {
    let destination = '';
    if (selectedOption.label?.toLowerCase().includes('tela')) {
      destination = 'CLOTH';
    } else {
      destination = 'SUPPLY';
    }

    const categories = await listCategory(destination);

    setCategories(categories);
    const [linea, subcategory] = await Promise.all([
      listLinea(),
      listSubCategory(destination)
    ]);

    let _colors = [];
    if (destination == 'CLOTH') {
      _colors = await listColorCloth({
        suppliers_id: supplierW.value,
        supply_categories_id: selectedOption.value
      });
    } else {
      _colors = await listColorSupplier({
        suppliers_id: supplierW.value,
        supply_types_id: selectedOption.value
      });
    }

    setLines(linea);
    setColors(_colors);
    setSubcategories(subcategory);
  };

  const onAddItemPurchase = (item: ListSuppliesI) => {
    const _item = { ...item };
    _item.quantity = 1;
    setListSuppliesAddedd([...listSuppliesAdded, _item]);
  };

  const handleQuantityChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value, 10);

    const updatedItems = listSuppliesAdded.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity || 0 } : item
    );

    setListSuppliesAddedd(updatedItems);
  };

  const handleDelete = (index: number) => {
    const updatedItems = listSuppliesAdded.filter((_, i) => i !== index);

    setListSuppliesAddedd(updatedItems);
  };

  const onCreateOrderPurchase = async () => {
    const order: Order = { supplier_id: 0, items_order: [] };
    order.supplier_id = parseInt(filter?.supplier?.value || '0');
    order.items_order = listSuppliesAdded.map(e => {
      return {
        supply_inventory_id: e.supply_inventory_id,
        quantity: e.quantity
      };
    });
    const result = await createSupplyPurchase(order);
    toast.success('Orden de compra creada correctamente');
    reset();
    setListSuppliesAddedd([]);
    setCategories([]);
    setSubcategories([]);
    setLines([]);
    setColors([]);
    setListSuppliesTable([]);
    setFilter(undefined);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Orden de compra</BreadcrumbItem>
      </Breadcrumbs>
      <div className='grid grid-cols-[1fr_2fr] gap-4 mt-5'>
        <Card className='pb-4'>
          <CardHeader>
            <CardTitle className='text-lg'>Filtrar </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={form.control}
                  name='supplier'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Proveedor</FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(supplierList)}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name='supply_type'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Tipo de insumo</FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(supplyType)}
                          onChange={selectedOption => {
                            onChangeTypeSupply({
                              label: selectedOption?.label,
                              value: selectedOption?.value
                            });
                            onChange(selectedOption);
                          }}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {supplyTypeW?.value && (
                  <>
                    <Controller
                      control={form.control}
                      name='category'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Categoría</FormLabel>
                          <FormControl>
                            <SelectReact
                              className='react-select'
                              classNamePrefix='select'
                              options={arrayToReactSelect(categories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name='subCategory'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Subcategoría</FormLabel>
                          <FormControl>
                            <SelectReact
                              className='react-select'
                              classNamePrefix='select'
                              options={arrayToReactSelect(subCategories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name='line'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Línea</FormLabel>
                          <FormControl>
                            <SelectReact
                              className='react-select'
                              classNamePrefix='select'
                              options={arrayToReactSelect(lines)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name='color'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <SelectReact
                              className='react-select'
                              classNamePrefix='select'
                              options={arrayToReactSelect(colors)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {supplyTypeW?.value && supplierW?.value && (
                  <div className='col-span-2 mt-4'>
                    <Button className='float-right' type='submit'>
                      Buscar Insumo
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Insumos encontrados</CardTitle>
            </CardHeader>
            <CardContent>
              {listSuppliesTable.length === 0 ? (
                <p>No existen filtros de búsqueda</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='font-semibold'>Insumos</TableHead>

                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listSuppliesTable.map(item => (
                      <TableRow key={item.supply_inventory_id}>
                        <TableCell>
                          {item.supply_type} {item.supply_category}{' '}
                          {item.supply_subcategory} {item.supply_line}{' '}
                          {`${item.width}X${item.heigth}`}
                          {item.supply_color_supplier}
                        </TableCell>

                        <TableCell className='flex justify-end'>
                          <div className='flex gap-3'>
                            <Button
                              size='icon'
                              variant='outline'
                              className=' h-7 w-7'
                              color='secondary'
                              onClick={() => onAddItemPurchase(item)}
                            >
                              <Icon
                                icon='heroicons:plus'
                                className=' h-4 w-4  '
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className='mt-2'>
            <CardHeader>
              <CardTitle className='text-base'>
                Items agregados a la orden de compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              {listSuppliesAdded.length === 0 ? (
                <p>No hay productos agregados a la órden de compra</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='font-semibold'>Insumos</TableHead>
                      <TableHead className='font-semibold'>Cantidad</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listSuppliesAdded.map((item, index) => (
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
                            onChange={e => handleQuantityChange(index, e)}
                          />
                        </TableCell>
                        <TableCell className='flex justify-end'>
                          <div className='flex gap-3'>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size='icon'
                                  variant='outline'
                                  className=' h-7 w-7'
                                  color='secondary'
                                >
                                  <Icon
                                    icon='heroicons:trash'
                                    className=' h-4 w-4  '
                                  />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirmación
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Deseas eliminar este item de la órden de
                                    compra?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className=' bg-destructive'>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className='bg-primary'
                                    onClick={() => handleDelete(index)}
                                  >
                                    Ok
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {listSuppliesAdded.length > 0 && (
                <div className='mt-4 flex justify-center'>
                  <Button type='submit' onClick={onCreateOrderPurchase}>
                    Crear orden de compra
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
