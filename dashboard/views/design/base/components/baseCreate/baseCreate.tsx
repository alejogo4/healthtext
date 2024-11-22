'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { formSchema } from '../../schema/formCreate';
import { CategoryBase } from '../../services/categoriesBase';
import { arrayToReactSelect } from '@/util/arrayToSelect';
import { createBase } from '../../services/crudBase';
import toast from 'react-hot-toast';

type Props = {
  gender?: DocumentTypes[] | [];
  base_categories?: CategoryBase[] | [];
};

export interface FormType {
  category_base_id: { value: string; label: string };
  gender_type_id: { value: string; label: string };
  description: string;
  name: string;
}

const BaseCreate: FC<Props> = ({ gender, base_categories = [] }) => {
  const form = useForm<FormType>({ resolver: zodResolver(formSchema) });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    ...formMethods
  } = form;

  const { control } = form;

  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });

  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      category_base_id: data.category_base_id.value,
      gender_type_id: data.gender_type_id.value
    };
    let response = await createBase(body);
    if (response?.status) {
      toast.success(response?.message);
      reset();
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className='mt-4'>
      <Card className='p-4 mt-8'>
        <h3 className='text-xl font-medium flex-1 leading-normal mb-8'>
          Crear Base
        </h3>
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
                  name='category_base_id'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn('', {
                          'text-destructive': form.formState.errors.category_base_id
                        })}
                      >
                        Seleccionar categoría
                      </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(base_categories)}
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
                  name='gender_type_id'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn('', {
                          'text-destructive': form.formState.errors.gender_type_id
                        })}
                      >
                        Seleccionar género
                      </FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={[
                            { value: '1', label: 'Hombre' },
                            { value: '2', label: 'Mujer' },
                            { value: '3', label: 'Mixto' }
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
