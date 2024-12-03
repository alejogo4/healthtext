'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import SelectReact from 'react-select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';



import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { CategoryBases, createLong, deleteLong, listLong, LongType } from '../services/crudLong';
import { CategoryBase } from '../../base/services/categoriesBase';
import { listBaseCategory } from '../../base/services/crudCategoriesBase';
import { arrayToReactSelect } from '@/util/arrayToSelect';

const schema = z.object({
  name: z.string().min(2),
  group: z
    .union([
      z.object({
        value: z
          .string({ required_error: 'El grupo es requerido' })
          .min(1, 'El grupo es requerido'),
        label: z.string().optional()
      }),
      z.null(),
      z.undefined()
    ])
    .refine(val => val !== null && val !== undefined, {
      message: 'El grupo es requerido'
    }),
});

export interface FormType {
  name: string;
  group: { value: string; label: string };
}

const LongPage = () => {
  const [data, setData] = useState<LongType[] | []>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState<CategoryBase[] | []>([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnDef<LongType>[] = [
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
      accessorKey: 'category_bases',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Categoría' />
      ),
      cell: ({ row }) => <div>{(row.getValue('category_bases') as CategoryBases)?.name }</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'category_bases',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Código' />
      ),
      cell: ({ row }) => <div>{(row.getValue('category_bases') as CategoryBases)?.code}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          onPressDelete={onDeleteItem}
          row={row}
          id={row.original.id.toString()}
        />
      )
    }
  ];

  const form = useForm<FormType>({ resolver: zodResolver(schema) });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    ...formMethods
  } = form;


  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await listLong();
    const categoryData = await listBaseCategory();
    setDataCategories(categoryData)
    setData(_data);
    setDataLoading(false);
  };

  const onDeleteItem = async (id: string) => {
    let response = await deleteLong(id);
    if (response?.status) {
      getData();
      toast.success(response?.message);
    }
  };

  const onSubmit = async (data: {
    name: string;
    group: { value: string; label: string };
  }) => {
    setLoading(true);
    console.log(data);
    let response = await createLong(data.name, data.group.value);
    if (response?.status) {
      getData();
      toast.success(response?.message);
      reset();
    } else {
      toast.error(response?.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Diseño</BreadcrumbItem>
        <BreadcrumbItem>Maestros</BreadcrumbItem>
        <BreadcrumbItem className='text-primary'>Largo</BreadcrumbItem>
      </Breadcrumbs>
      <div className='grid grid-cols-[1fr_2fr] gap-4 mt-5'>
        <Card>
          <CardHeader>
            <CardTitle>Nuevo largo</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='col-span-12 lg:col-span-12'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del largo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nombre'
                            {...field}
                            className={cn('', {
                              'border-destructive focus:border-destructive':
                                form.formState.errors.name
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Controller
                  control={form.control}
                  name='group'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel
                        className={cn('', {
                          'text-destructive': form.formState.errors.group
                        })}
                      >
                        Seleccionar Categoría
                      </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(dataCategories)}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {errorMessages.length > 0 && (
                  <div className='my-8'>
                    <div className='text-red-500'>
                      <h3 className='font-bold mb-2'>Errores de validación:</h3>
                      <ul className='list-disc pl-5'>
                        {errorMessages.map((error, index) => (
                          <li key={index} className='mb-1'>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <Button
                  size='xs'
                  variant='outline'
                  type='submit'
                  color='secondary'
                  className='mt-4'
                >
                  Guardar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={data} columns={columns} loading={dataLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LongPage;
