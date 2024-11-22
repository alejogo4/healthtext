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

import { Master } from '@/views/types/master';

import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { createLong, deleteLong, listLong } from '../services/crudLong';

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
  const [data, setData] = useState<Master[] | []>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns: ColumnDef<Master>[] = [
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
      accessorKey: 'group',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Grupo' />
      ),
      cell: ({ row }) => <div>{row.getValue('group')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          onPressDelete={onDeleteItem}
          row={row}
          id={row.original.id}
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
                        Seleccionar grupo
                      </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={[
                            { value: 'XS', label: 'XS' },
                            { value: 'S', label: 'S' },
                            { value: 'M', label: 'M' },
                            { value: 'L', label: 'L' },
                            { value: 'XL', label: 'XL' },
                            { value: 'XXL', label: 'XXL' },
                            { value: '3XL', label: '3XL' },
                            { value: '4XL', label: '4XL' },
                            { value: '28', label: '28' },
                            { value: '30', label: '30' },
                            { value: '32', label: '32' },
                            { value: '34', label: '34' },
                            { value: '36', label: '36' },
                            { value: '38', label: '38' },
                            { value: '40', label: '40' },
                            { value: '42', label: '42' },
                            { value: '44', label: '44' }
                          ]}
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
