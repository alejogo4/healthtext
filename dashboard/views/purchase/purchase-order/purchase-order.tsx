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
import {
  Form,
  FormControl,
  FormItem,
  FormLabel
} from '@/components/ui/form';
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
import { listCategory, listColor, listLinea, listSupplier, listTypeSupply } from '../services/services';
import { arrayToReactSelect } from '@/util/arrayToSelect';

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
  input_type: { value: string; label: string };
  category?: { value: string; label: string };
  subCategory?: { value: string; label: string };
  line?: { value: string; label: string };
  color?: { value: string; label: string };
}
const input_type = [
  { value: 'Tela', label: 'Tela' },
  { value: 'Insumo', label: 'Insumo' }
];


export const suppliers: { value: string; label: string }[] = [
  { value: "SESGOCOLOR", label: "SESGOCOLOR" },
  { value: "COATS", label: "COATS" },
  { value: "BOMBAY", label: "BOMBAY" },
];

export const material: { value: string; label: string }[] = [
  { value: "SESGOS", label: "SESGOS" },
  { value: "HILOS", label: "HILOS" },
  { value: "BOTONES", label: "BOTONES" },
];

export const colors: { value: string; label: string }[] = [
  { value: "BLANCO", label: "BLANCO" },
  { value: "NEGRO", label: "NEGRO" },
  { value: "AZUL OSCURO - UPB", label: "BOTONES" },
];

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

  const [supplierList, setSupplierList]= useState<any[]>([]);
  const [supplyType, setSupplyType]= useState<any[]>([]);
  const [categories, setCategories]= useState<any[]>([]);
  const [subCategories, setSubcategories]= useState<any[]>([]);
  const [lines, setLines]= useState<any[]>([]);
  const [colors, setColors]= useState<any[]>([]);

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
        setSupplyType(typeSupply)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, []);



  const onSubmit = async (data: any) => {
    // const response = await createClient(mapFormToClientCreate(data));
    // toast({
    //   title: response?.message
    // });
  };

  const form = useForm<FormType>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    ...formMethods
  } = form;

  const { control } = form;

  const selectedType = watch('input_type');

  const onChangeTypeSupply = async (selectedOption: { value?: string; label?: string }) => {
    console.log('La opción seleccionada es:', selectedOption);
    const categories = await listCategory('SUPPLY');
    setCategories(categories);
    const [linea, _colors] = await Promise.all([
      listLinea(),  
      listColor()  
    ]);

    setLines(linea);
    setColors(_colors);

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
                  name='input_type'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Tipo de insumo</FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(supplyType)}
                          onChange={(selectedOption) => {
                            onChangeTypeSupply({label: selectedOption?.label, value: selectedOption?.value})
                            onChange(selectedOption);
                          }}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {selectedType?.value && (
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
                              options={input_type}
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

                <div className='col-span-2 mt-4'>
                  <Button className='float-right' type='submit'>
                    Buscar Insumo
                  </Button>
                </div>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='font-semibold'>Items</TableHead>

                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>

                      <TableCell className='flex justify-end'>
                        <div className='flex gap-3'>
                          <Button
                            size='icon'
                            variant='outline'
                            className=' h-7 w-7'
                            color='secondary'
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
            </CardContent>
          </Card>

          <Card className='mt-2'>
            <CardHeader>
              <CardTitle className='text-base'>
                Items agregados a la orden de compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='font-semibold'>Items</TableHead>
                    <TableHead className='font-semibold'>Cantidad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <Input type='number'></Input>
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
                                  Estas seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Deseas eliminar este item de la orden de
                                  compra?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className=' bg-destructive'>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className='bg-primary'>
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
              <div className='mt-4 flex justify-center'>
                <Button type='submit'>Crear orden de compra</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
