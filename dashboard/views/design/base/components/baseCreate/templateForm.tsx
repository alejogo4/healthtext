'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FC } from 'react';

import SelectReact from 'react-select';

import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { DocumentTypes } from '@/views/services/documentTypes';
import { PersonTypes } from '@/views/services/personType';
import { mapFormToClientCreate } from '@/views/types/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { formSchema } from '../../schema/formCreate';
import { createClient } from '../../services/crudBase';

type Props = {
  gender?: DocumentTypes[] | [];
  base_categories?: PersonTypes[] | [];
};

export interface FormType {
  category_id: { value: string; label: string };
  gender_id: { value: string; label: string };
  description: string;
  name: string;
}

const BaseCreate: FC<Props> = ({ gender, base_categories }) => {
  const onSubmit = async (data: any) => {
    // toast({
    //   title: response?.message
    // });
  };

  const form = useForm<FormType>({ resolver: zodResolver(formSchema) });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    ...formMethods
  } = form;

  const { control } = form;

  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });

  return (
    <div className='mt-4'>
      <Card className='p-4 mt-8'>
        <h3 className="text-xl font-medium flex-1 leading-normal mb-8">Crear Base</h3>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-12 gap-5'>
              <div className='col-span-12 lg:col-span-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la base</FormLabel>
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
              <div className='col-span-12 lg:col-span-6'>
                <Controller
                  control={form.control}
                  name='category_id'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn('', {
                          'text-destructive': form.formState.errors.category_id
                        })}
                      >
                        Seleccionar categoría
                      </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={[
                            { value: 'Conjuntos', label: 'Conjuntos' },
                            { value: 'Blusas', label: 'Blusas' },
                            { value: 'Pantalones', label: 'Pantalones' }
                          ]}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-12 lg:col-span-6'>
                <Controller
                  control={form.control}
                  name='gender_id'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn('', {
                          'text-destructive': form.formState.errors.category_id
                        })}
                      >
                        Seleccionar género
                      </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={[
                            { value: 'Hombre', label: 'Hombre' },
                            { value: 'Mujer', label: 'Mujer' },
                            { value: 'Mixto', label: 'Mixto' }
                          ]}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-12 lg:col-span-6'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Descripción'
                          {...field}
                          className={cn('', {
                            'border-destructive focus:border-destructive':
                              form.formState.errors.description
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
      </Card>
    </div>
  );
};

export default BaseCreate;
