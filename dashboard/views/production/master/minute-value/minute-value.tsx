'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';

import { Master } from '@/views/types/master';

import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  createMinuteValue,
  deleteMinuteValue,
  listMinuteValue,
  MinuteType
} from '../services/crudMinuteValue';

const schema = z.object({
  real: z.string().min(2),
  comercial: z.string().min(2)
});

const MinuteValue = () => {
  const [data, setData] = useState<MinuteType[] | []>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns: ColumnDef<MinuteType>[] = [
    {
      accessorKey: 'real',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Valor real' />
      ),
      cell: ({ row }) => <div>{row.getValue('real')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'commercial',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Valor comercial' />
      ),
      cell: ({ row }) => <div>{row.getValue('commercial')}</div>,
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      real: '',
      comercial: '',
    }
  });

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await listMinuteValue();
    setData(_data);
    setDataLoading(false);
  };

  const onDeleteItem = async (id: string) => {
    let response = await deleteMinuteValue(id);
    if (response?.status) {
      getData();
      toast.success(response?.message);
    }
  };

  const onSubmit = async (data: { real: string, comercial:string }) => {
    setLoading(true);
    let response = await createMinuteValue(data.real, data.comercial);
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
        <BreadcrumbItem>Producción</BreadcrumbItem>
        <BreadcrumbItem>Maestros</BreadcrumbItem>
        <BreadcrumbItem className='text-primary'>Valor minuto</BreadcrumbItem>
      </Breadcrumbs>
      <div className='grid grid-cols-[1fr_2fr] gap-4 mt-5'>
        <Card>
          <CardHeader>
            <CardTitle>Nuevo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-4'>
                <div className='col-span-2 flex flex-col gap-2'>
                  <Label htmlFor='real'>Valor real</Label>
                  <Input
                    type='text'
                    id='real'
                    {...register('real')}
                    className={cn('peer', {
                      'border-destructive': errors.real
                    })}
                  />
                  {errors.real && (
                    <div className=' text-destructive mt-2'>
                      {errors.real.message}
                    </div>
                  )}
                </div>
                <div className='col-span-2 flex flex-col gap-2'>
                  <Label htmlFor='comercial'>Valor comercial</Label>
                  <Input
                    type='text'
                    id='comercial'
                    {...register('comercial')}
                    className={cn('peer', {
                      'border-destructive': errors.comercial
                    })}
                  />
                  {errors.comercial && (
                    <div className=' text-destructive mt-2'>
                      {errors.comercial.message}
                    </div>
                  )}
                </div>
                <div className='col-span-2'>
                  <Button
                    className='float-right'
                    type='submit'
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className='ltr:mr-2 rtl:ml-2 h-4 w-4 animate-spin' />
                    )}
                    {loading ? 'Loading...' : 'Guardar'}
                  </Button>
                </div>
              </div>
            </form>
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

export default MinuteValue;
