'use client';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';

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
import {
  Form,
  FormControl,
  FormField,
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
import { Controller, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CategoryResponse } from '../../services/categoriesBase';
import { createSet, RequestCreateSet } from '../../services/crudSet';
import toast from 'react-hot-toast';



export interface FormType {
  shirt: { value: string; label: string };
  pant: string[];
  name: string;
}

const setCreate: FC = () => {
  const [shirtVariant, setShirtVariant] = useState<CategoryResponse>();

  const [listPantsAdded, setListPantsAdded] = useState<CategoryResponse[]>([]);

  const shirt_options = shirts.map(shirt => {
    return {
      label: `${shirt.category_name}(${shirt.base_name}) - ${shirt.gender}`,
      value: shirt.variant_id.toString()
    };
  });

  const pant_options = pants.map(pant => {
    return {
      label: `${pant.category_name}(${pant.base_name}) - ${pant.gender}`,
      value: pant.variant_id.toString()
    };
  });

  const onSubmit = async (data: FormType) => {
    setShirtVariant(
      shirts.find(shirt => shirt.variant_id.toString() == data.shirt.value)
    );

    const filteredData = pants.filter(item =>
      data.pant.includes(String(item.variant_id))
    );

    setListPantsAdded(filteredData);
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

  const handleDelete = (index: number) => {
    const updatedItems = listPantsAdded.filter((_, i) => i !== index);
    setListPantsAdded(updatedItems);
  };

  const name = watch('name');

  const onCreateSet = async () => {
    if (!shirtVariant || listPantsAdded.length === 0) {
      return null;
    }
    const body: RequestCreateSet = {
      set_name: name,
      shirt_variant_id: shirtVariant.variant_id,
      pant_variant_ids: listPantsAdded.map(pant => pant.variant_id)
    };

    await createSet(body);
    reset();
    setShirtVariant(undefined);
    setListPantsAdded([]);
    toast.success('Conjunto creado correctamente');
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Crear conjunto</BreadcrumbItem>
      </Breadcrumbs>
      <div className='grid grid-cols-[1fr_2fr] gap-4 mt-5'>
        <Card className='pb-4'>
          <CardHeader>
            <CardTitle className='text-lg'>Filtrar </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del conjunto</FormLabel>
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
                <Controller
                  control={form.control}
                  name='shirt'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Camisa</FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={shirt_options}
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
                  name='pant'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Pantalones: </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={pant_options}
                          isMulti
                          onChange={selected => {
                            onChange(selected.map(option => option.value));
                          }}
                          onBlur={onBlur}
                          value={pant_options.filter(option =>
                            (value as unknown as string)?.includes(option.value)
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className='col-span-2 mt-4'>
                  <Button className='float-right' type='submit'>
                    Agregar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div>
          <Card className='mt-2'>
            <CardHeader>
              <CardTitle className='text-base'>
                {shirtVariant ? (
                  <>
                    {`Conjunto: ${name}`} <br />
                    {`Camisa: ${shirtVariant.category_name} (${shirtVariant.base_name}) - ${shirtVariant.gender}`}
                  </>
                ) : (
                  'Seleccionar conjunto'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {listPantsAdded.length === 0 ? (
                <p>No hay items agregados al conjunto</p>
              ) : (
                <>
                  <h4>Pantalones: </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='font-semibold'>Nombre</TableHead>
                        <TableHead className='font-semibold'>
                          Categoría base
                        </TableHead>
                        <TableHead className='font-semibold'>Género</TableHead>
                        <TableHead className='font-semibold'>
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listPantsAdded.map((item, index) => (
                        <TableRow key={item.variant_id}>
                          <TableCell>{item.base_name}</TableCell>
                          <TableCell>{item.base_name}</TableCell>
                          <TableCell>{item.gender}</TableCell>

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
                </>
              )}
              {listPantsAdded.length > 0 && (
                <div className='mt-4 flex justify-center'>
                  <Button type='submit' onClick={onCreateSet}>
                    Crear conjunto
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

export default setCreate;
