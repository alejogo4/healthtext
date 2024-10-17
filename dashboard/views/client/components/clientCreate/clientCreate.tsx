'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Step, StepLabel, Stepper } from '@/components/ui/steps';
import { toast } from '@/components/ui/use-toast';
import React, { FC } from 'react';

import SelectReact from 'react-select';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { arrayToReactSelect } from '@/util/arrayToSelect';
import { DocumentTypes } from '@/views/services/documentTypes';
import { PersonTypes } from '@/views/services/personType';
import { mapFormToClientCreate } from '@/views/types/client';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { formSchema } from '../../schema/formCreate';
import { createClient } from '../../services/crudClient';
import { CountryTypes } from '@/views/services/countries';
import { listCities, listStates } from '@/views/services/countries-client';

type Props = {
  documentTypes: DocumentTypes[] | [];
  personTypes: PersonTypes[] | [];
  countries: CountryTypes[] | [];
};

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
  person_type_id: { value: string; label: string };
  document_type_id: { value: string; label: string };
  document_number: string;
  name: string;
  payment_currency: { value: string };
  country: { value: string; label: string };
  department: { value: string; label: string };
  city: { value: string; label: string };
  neighborhood: string;
  postal_code: string;
  full_address: string;
  email: string;
  where_authorize: { value: string };
  way_to_meet_them: { value: string };
  profession_specialty: string;
  authorizes_receive_information: boolean;
  date_birth: 'string';
  contact_info: ContactInfo[];
}

const way_to_meet_them = [
  { value: 'social_media', label: 'Redes Sociales' },
  { value: 'recommendation', label: 'Recomendación' },
  { value: 'advertising', label: 'Publicidad' },
  { value: 'direct_contact', label: 'Contacto Directo' }
];

const ClientCreate: FC<Props> = ({ documentTypes, personTypes, countries }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [departments, setDepartments] = React.useState<any>([]);
  const [cities, setCities] = React.useState<any[]>([]);

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

  const onSubmit = async (data: any) => {
    const response = await createClient(mapFormToClientCreate(data));
    handleNext();
    toast({
      title: response?.message
    });
  };
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const form = useForm<FormType>({ resolver: zodResolver(formSchema) });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    ...formMethods
  } = form;

  const typePerson = watch('document_type_id');
  const accept_information = watch('authorizes_receive_information');

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact_info'
  });

  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });


  const onChangeCountry = async (selectedOption: { value?: string; label?: string }) => {
    
    const states = await listStates(selectedOption?.value ?? '');
    
    setDepartments(states);

  };

  const onChangeState = async (selectedOption: { value?: string; label?: string }) => {
    
    const cities = await listCities(selectedOption?.value ?? '');
    setCities(cities);

  };
  

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
      <Card className='p-4 mt-8'>
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
                Reiniciar
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
                        <Controller
                          control={form.control}
                          name='person_type_id'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Tipo de cliente</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={arrayToReactSelect(personTypes)}
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
                          name='document_type_id'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Tipo de Documento</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={arrayToReactSelect(documentTypes)}
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
                          name='document_number'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {' '}
                                {typePerson?.label == 'JURIDICA'
                                  ? 'NIT'
                                  : 'Documento'}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    typePerson?.label == 'JURIDICA'
                                      ? 'NIT'
                                      : 'Documento'
                                  }
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.document_number
                                  })}
                                />
                              </FormControl>
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
                              <FormLabel>
                                {typePerson?.value == 'JURIDICA'
                                  ? 'Razón Social'
                                  : 'Nombre'}{' '}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    typePerson?.value == 'JURIDICA'
                                      ? 'Razón Social'
                                      : 'Nombre'
                                  }
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
                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type='email'
                                  placeholder='Correo electrónico'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.email
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='date_birth'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha de cumpleaños</FormLabel>
                              <FormControl>
                                <Input
                                  type='date'
                                  placeholder='DD/MM/YYYY'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.date_birth
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
                          name='payment_currency'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Moneda de Pago</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={[
                                    { value: 'USD', label: 'Dólar' },
                                    { value: 'MXN', label: 'Peso' }
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
                          name='profession_specialty'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profesión</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Profesión'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.profession_specialty
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
                          name='way_to_meet_them'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>¿Cómo nos conocieron?</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={way_to_meet_them}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='col-span-12 lg:col-span-12'>
                        <Controller
                          name='authorizes_receive_information'
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <div className='col-span-12 lg:col-span-4'>
                                <Checkbox
                                  onCheckedChange={checked => {
                                    form.setValue(
                                      'authorizes_receive_information',
                                      !field.value
                                    );
                                  }}
                                  checked={field.value ?? false}
                                >
                                  Autoriza recibir información
                                </Checkbox>
                              </div>
                            );
                          }}
                        />
                      </div>
                      {accept_information && (
                        <div className='col-span-12 lg:col-span-12'>
                          <Controller
                            control={form.control}
                            name='where_authorize'
                            render={({
                              field: { onChange, onBlur, value, ref }
                            }) => (
                              <FormItem>
                                <FormLabel>Autorización por</FormLabel>
                                <FormControl>
                                  <SelectReact
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={[
                                      { value: 'email', label: 'Email' },
                                      { value: 'cellphone', label: 'Celular' }
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
                      )}
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <div className='col-span-12 lg:col-span-6'>
                        <Controller
                          control={form.control}
                          name='country'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>País</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={arrayToReactSelect(countries)}
                                  onChange={(selectedOption) => {
                                    onChangeCountry({label: selectedOption?.label, value: selectedOption?.value})
                                    onChange(selectedOption);
                                  }}
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
                          name='department'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Departamento</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={arrayToReactSelect(departments)}
                                  onChange={(selectedOption) => {
                                    onChangeState({label: selectedOption?.label, value: selectedOption?.value})
                                    onChange(selectedOption);
                                  }}
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
                          name='city'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Ciudad</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={arrayToReactSelect(cities)}
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
                                  type='number'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.postal_code
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='full_address'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dirección Cliente</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Dirección Cliente'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.full_address
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      {fields.map((item, index) => (
                        <>
                          <div className='col-span-12'>
                            <h2 className='font-bold text-primary text-xl'>
                              Contacto #{index + 1}
                            </h2>
                          </div>
                          <div
                            className='col-span-12 lg:col-span-6'
                            key={item.id}
                          >
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.name_contact`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nombre</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder='Nombre'
                                      {...field}
                                      className={cn('', {
                                        'border-destructive focus:border-destructive':
                                          form.formState.errors
                                            .contact_info?.[0]?.name_contact
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='col-span-12 lg:col-span-6'>
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.email_contact`}
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
                                          form.formState.errors
                                            .contact_info?.[0]?.email_contact
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className='col-span-12 lg:col-span-6'>
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.extension`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Extensión</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder='Extensión'
                                      {...field}
                                      className={cn('', {
                                        'border-destructive focus:border-destructive':
                                          form.formState.errors
                                            .contact_info?.[0]?.extension
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className='col-span-12 lg:col-span-6'>
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.phone`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Teléfono</FormLabel>
                                  <FormControl>
                                    <Input
                                      type='number'
                                      placeholder='Teléfono'
                                      {...field}
                                      className={cn('', {
                                        'border-destructive focus:border-destructive':
                                          form.formState.errors
                                            .contact_info?.[0]?.phone
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className='col-span-12 lg:col-span-6'>
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.job_title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cargo Empresa</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder='Cargo Empresa'
                                      {...field}
                                      className={cn('', {
                                        'border-destructive focus:border-destructive':
                                          form.formState.errors
                                            .contact_info?.[0]?.job_title
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className='col-span-12 lg:col-span-6'>
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.mobile`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Celular</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder='Celular'
                                      type='number'
                                      {...field}
                                      className={cn('', {
                                        'border-destructive focus:border-destructive':
                                          form.formState.errors
                                            .contact_info?.[0]?.mobile
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className='col-span-12 lg:col-span-6'>
                            <FormField
                              control={form.control}
                              name={`contact_info.${index}.alternate_email`}
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
                                          form.formState.errors
                                            .contact_info?.[0]?.alternate_email
                                      })}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <Button
                              type='button'
                              size='icon'
                              className=' rounded-full mt-4'
                              onClick={() => remove(index)}
                              color='destructive'
                            >
                              <Icon
                                icon='heroicons:trash'
                                className=' h-6 w-6 '
                              />
                            </Button>
                          </div>
                          <div className='w-full'></div>
                        </>
                      ))}
                      <div className='w-full col-span-12 py-4'>
                        <Button
                          type='button'
                          onClick={() =>
                            append({
                              name_contact: '',
                              extension: '',
                              phone: '',
                              mobile: '',
                              email_contact: '',
                              alternate_email: '',
                              job_title: ''
                            })
                          }
                        >
                          Agregar Contacto
                          <Icon
                            icon='heroicons:plus'
                            className='w-6 h-6 ml-2 '
                          />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {errorMessages.length > 0 && (
                    <div style={{ color: 'red' }}>
                      <h3 className='font-bold mb-4'>Errores:</h3>
                      {errorMessages}
                    </div>
                  )}
                </div>
                {activeStep === steps.length - 1 && (
                  <div className='w-full flex-col flex items-center'>
                    <hr className='w-full'></hr>
                    <Button
                      size='xs'
                      variant='outline'
                      type='submit'
                      color='secondary'
                      className='mt-4'
                    >
                      Guardar Cliente
                    </Button>
                  </div>
                )}
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
              {activeStep !== steps.length - 1 && (
                <div className='flex	gap-2 '>
                  <Button
                    size='xs'
                    variant='outline'
                    color='secondary'
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default ClientCreate;
