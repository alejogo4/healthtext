'use client';
import React from 'react';
import { Stepper, Step, StepLabel } from '@/components/ui/steps';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';

import SelectReact from 'react-select';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { faker } from '@faker-js/faker';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { supplierSchema } from './schema/formCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const ClientCreate = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = ['Datos Básicos', 'Dirección', 'Contactos'];

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = () => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <div className='mt-2 w-[340px] rounded-md bg-slate-950 p-4 top-0 right-0'>
          <p className='text-primary-foreground'>Done</p>
        </div>
      )
    });
  };
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const type_supplier = [
    { value: 'juridico', label: 'Jurídico' },
    { value: 'natural', label: 'Natural' }
  ];

  const type_payment = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'cheque', label: 'Cheque' }
  ];

  //Form

  const form = useForm({
    resolver: zodResolver(supplierSchema[activeStep])
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    ...formMethods
  } = form;

  // function onSubmit(data: z.infer<typeof supplierSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-default-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  return (
    <div className='mt-4'>
      <Stepper
        current={activeStep}
        direction={isTablet ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => {
          const stepProps: any = {};
          const labelProps: any = {};
          if (isStepOptional(index)) {
            labelProps.optional = <StepLabel>Optional</StepLabel>;
          }
          return (
            <Step key={faker.string.uuid()} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Card className='p-4 my-4'>
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className='mt-2 mb-2 font-semibold text-center'>
              Cliente registrado de manera exitosa
            </div>
            <div className='flex pt-2'>
              <div className=' flex-1' />
              <Button
                size='xs'
                variant='outline'
                color='destructive'
                className='cursor-pointer'
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className='col-span-12 mb-6'>
              <h4 className='text-sm font-medium text-default-600'>
                Ingresa la información del cliente
              </h4>
              <p className='text-xs text-default-600 mt-1'>
                Ingresa cada uno de los campos que se requieren
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-12 gap-5'>
                  {activeStep === 0 && (
                    <>
                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='type_supplier'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Proveedor</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  defaultValue={{
                                    label: 'Jurídico',
                                    value: 'juridico'
                                  }}
                                  options={type_supplier}
                                  {...field}
                                  onChange={selectedOption =>
                                    field.onChange(selectedOption.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='document_number'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>NIT/Documento</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='NIT/Documento'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.document_number
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre/Razón Social</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Nombre/Razón Social'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.name
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='country'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>País</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='País'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.country
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='state'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Departamento</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Departamento'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.state
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='city'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ciudad</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Ciudad'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.city
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='neighborhood'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Barrio</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Barrio'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.neighborhood
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='postal_code'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Código Postal</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Código Postal'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.postal_code
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='company_address'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dirección Cliente</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Dirección Cliente'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.company_address
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
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
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo</FormLabel>
                              <FormControl>
                                <Input
                                  type='email'
                                  placeholder='Correo'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.email
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='extension'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Extensión</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Extensión'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.extension
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='phone'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Teléfono'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.phone
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='position'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cargo Empresa</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Cargo Empresa'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.position
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='mobile'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Celular</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Celular'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.mobile
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='alternate_email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo Alternativo</FormLabel>
                              <FormControl>
                                <Input
                                  type='email'
                                  placeholder='Correo Alternativo'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.alternate_email
                                  })}
                                />
                              </FormControl>
                              <FormMessage className='bg-destructive/90 text-primary-foreground text-[10px] inline-flex justify-center items-center font-base h-[22px] px-2 rounded-sm ' />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </form>
            </Form>

            <div className='flex pt-2 '>
              <Button
                size='xs'
                variant='outline'
                color='secondary'
                className={cn('cursor-pointer', {
                  hidden: activeStep === 0
                })}
                onClick={handleBack}
              >
                Atrás
              </Button>
              <div className='flex-1	gap-4 ' />
              <div className='flex	gap-2 '>
                <Button
                  size='xs'
                  variant='outline'
                  type='submit'
                  color='secondary'
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default ClientCreate;
