'use client';
import { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { DataRows, fakeData } from './data';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CollapsibleTable = () => {
  const [collapsedRows, setCollapsedRows] = useState<number[]>([]);
  const toggleRow = (id: number) => {
    if (collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter(rowId => rowId !== id));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  };
  const columns: { key: string; label: string }[] = [
    {
      key: 'nombre',
      label: 'nombre'
    },
    {
      key: 'nit/documento',
      label: 'nit/documento'
    },
    {
      key: 'país',
      label: 'país'
    },
    {
      key: 'action',
      label: 'Acción'
    }
  ];
  return (
    <>
      <div className='my-4 w-full'>
        <div className='col-span-12 lg:col-span-6'>
          <Input type='text' placeholder='Buscar' />
        </div>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fakeData.map((item: DataRows) => (
              <Fragment key={item.id}>
                <TableRow>
                  <TableCell>
                    <div className='flex items-center gap-4'>
                      <Button
                        onClick={() => toggleRow(item.id)}
                        size='icon'
                        variant='outline'
                        color='secondary'
                        className=' h-7 w-7 border-none rounded-full '
                      >
                        <Icon
                          icon='heroicons:chevron-down'
                          className={cn(
                            'h-5 w-5 transition-all duration-300 ',
                            {
                              'rotate-180': collapsedRows.includes(item.id)
                            }
                          )}
                        />
                      </Button>
                      {item.name}
                    </div>
                  </TableCell>

                  <TableCell>{item.nit}</TableCell>
                  <TableCell>{item.country}</TableCell>

                  <TableCell className='flex gap-3  justify-end'>
                    <Button
                      size='icon'
                      variant='outline'
                      className=' h-7 w-7'
                      color='secondary'
                    >
                      <Icon icon='heroicons:pencil' className='h-4 w-4' />
                    </Button>
                    <Button
                      size='icon'
                      variant='outline'
                      className=' h-7 w-7'
                      color='secondary'
                    >
                      <Icon icon='heroicons:eye' className='h-4 w-4' />
                    </Button>
                    <Button
                      size='icon'
                      variant='outline'
                      className=' h-7 w-7'
                      color='secondary'
                    >
                      <Icon icon='heroicons:trash' className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
                {collapsedRows.includes(item.id) && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className='ltr:pl-12 rtl:pr-12 flex flex-col items-start'>
                        <p>País:{item.details.country}</p>
                        <p>Ciudad: {item.details.city}</p>

                        <p>Demás datos</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default CollapsibleTable;
