'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Step, StepLabel, Stepper } from '@/components/ui/steps';
import { toast } from '@/components/ui/use-toast';
import React, { FC } from 'react';

import SelectReact from 'react-select';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { createSupplier } from '../../services/crudSupplier';
import { mapToSupplierCreate } from '@/views/types/supplier';

const CheckboxForm = [
  {
    id: 'registered_simple_tax_regime',
    label: '¿Está registrado en el régimen simple de tributación?'
  },
  {
    id: 'big_contributor',
    label: '¿Es gran contribuyente?'
  },
  {
    id: 'vat_responsible',
    label: '¿Es responsable de IVA?'
  },
  {
    id: 'reteiva_not_registered_simple_regimen',
    label:
      'En la venta NO POS causar RETEIVA a Resp. de IVA no registrado en el Rég. Simple'
  },
  {
    id: 'reteiva_registered_simple_regimen',
    label:
      'En la venta NO POS causar RETEIVA a Resp. de IVA registrado en el Rég. Simple'
  },
  {
    id: 'cause_retefuente_for_income_tax',
    label: 'En la venta NO POS causar RETENCIÓN EN LA FUENTE por renta'
  },
  {
    id: 'cause_retefuente_for_ica',
    label: 'En la venta NO POS causar RETENCIÓN EN LA FUENTE por ICA'
  },
  {
    id: 'is_self_retaining',
    label: 'Es autoretenedor de IVA'
  }
];

export interface ContactInfo {
  name_contact: string;
  extension: string;
  phone: string;
  mobile: string;
  email: string;
  alternate_email: string;
  position: string;
}

export interface FormType {
  name: string;
  person_type_id: { value: string; label: string };
  document_type_id: { value: string; label: string };
  document_number: string;
  url_website: string;
  url_facebook: string;
  url_twitter: string;
  country: { value: string; label: string };
  department: { value: string; label: string };
  city: { value: string; label: string };
  neighborhood: string;
  postal_code: string;
  full_address: string;
  tax_regime: string;
  type_account: string;
  bank: string;
  account_number: string;
  nationality?: string;
  attached_documents: string[];
  payment_option: { value: string };
  invoice_deadline: { value: string };
  type_service: [{ value: string }];
  contact_info: ContactInfo[];
  registered_simple_tax_regime: boolean;
  big_contributor: boolean;
  vat_responsible: boolean;
  reteiva_not_registered_simple_regimen: boolean;
  reteiva_registered_simple_regimen: boolean;
  cause_retefuente_for_income_tax: boolean;
  cause_retefuente_for_ica: boolean;
  is_self_retaining: boolean;
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { arrayToReactSelect } from '@/util/arrayToSelect';
import { DocumentTypes } from '@/views/services/documentTypes';
import { PersonTypes } from '@/views/services/personType';
import { Icon } from '@iconify/react';
import { formSchema } from '../../schema/formCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { CountryTypes } from '@/views/services/countries';
import { listCities, listStates } from '@/views/services/countries-client';

type Props = {
  documentTypes: DocumentTypes[] | [];
  personTypes: PersonTypes[] | [];
  countries: CountryTypes[] | [];
};

const SupplierCreate: FC<Props> = ({
  documentTypes,
  personTypes,
  countries
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const [departments, setDepartments] = React.useState<any>([]);
  const [cities, setCities] = React.useState<any[]>([]);

  const steps = ['Datos Básicos', 'Dirección', 'Datos Fiscales', 'Contactos'];
  const [documents, setDocuments] = React.useState<
    { name: string; extension: string; fileBase64: string }[]
  >([]);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = async () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = async (data: any) => {
    const _data = { ...data, attached_documents: documents };
    const response = await createSupplier(mapToSupplierCreate(_data));
    handleNext();
    toast({
      title: response?.message
    });
  };
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const type_payment = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'cheque', label: 'Cheque' }
  ];

  const paymentTerms = [
    { value: '30_days', label: '30 Días' },
    { value: '60_days', label: '60 Días' },
    { value: '90_days', label: '90 Días' }
  ];

  const serviceTypes = [
    { value: 'insumos', label: 'Insumos' },
    { value: 'telas', label: 'Telas' },
    { value: 'servicios', label: 'Servicios' }
  ];

  const accountTypes = [
    { value: 'corriente', label: 'Cuenta Corriente' },
    { value: 'ahorros', label: 'Cuenta de Ahorros' },
    { value: 'empresa', label: 'Cuenta de Empresa' },
    { value: 'monetaria', label: 'Cuenta Monetaria' },
    { value: 'inversion', label: 'Cuenta de Inversión' }
  ];

  //Form

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      person_type_id: { value: '', label: '' },
      document_type_id: { value: '', label: '' },
      document_number: '',
      url_website: '',
      url_facebook: '',
      url_twitter: '',
      country: { value: '', label: '' },
      department: { value: '', label: '' },
      city: { value: '', label: '' },
      neighborhood: '',
      postal_code: '',
      full_address: '',
      tax_regime: '',
      type_account: '',
      bank: '',
      account_number: '',
      attached_documents: [],
      payment_option: { value: '' },
      invoice_deadline: { value: '' },
      type_service: [], // Inicializar como un array con un objeto vacío
      contact_info: [
        {
          name_contact: '',
          extension: '',
          phone: '',
          mobile: '',
          email: '',
          alternate_email: '',
          position: ''
        }
      ],
      registered_simple_tax_regime: false,
      big_contributor: false,
      vat_responsible: false,
      reteiva_not_registered_simple_regimen: false,
      reteiva_registered_simple_regimen: false,
      cause_retefuente_for_income_tax: false,
      cause_retefuente_for_ica: false,
      is_self_retaining: false
    }
  });
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact_info'
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    ...formMethods
  } = form;

  const typePerson = watch('document_type_id');

  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Files = await Promise.all(
        Array.from(files).map(async file => {
          const base64 = await toBase64(file);
          return {
            name: file.name,
            extension: file.name.split('.').pop() || '',
            fileBase64: base64
          };
        })
      );
      setDocuments(base64Files);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

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
              Proveedor registrado de manera exitosa
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
                Ingresa la información del proveedor
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
                              <FormLabel>Tipo de Proveedor</FormLabel>
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
                        <Controller
                          control={form.control}
                          name='invoice_deadline'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Plazo de Pago</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={paymentTerms}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                  ref={ref}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='col-span-12 lg:col-span-6'>
                        <Controller
                          control={form.control}
                          name='type_service'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Tipo de Servicio</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={serviceTypes}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                  isMulti
                                  ref={ref}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='url_website'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Website'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.url_website
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
                          name='url_facebook'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Facebook'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.url_facebook
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
                          name='url_twitter'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Twitter'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.url_twitter
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
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
                                  onChange={selectedOption => {
                                    onChangeCountry({
                                      label: selectedOption?.label,
                                      value: selectedOption?.value
                                    });
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
                                  onChange={selectedOption => {
                                    onChangeState({
                                      label: selectedOption?.label,
                                      value: selectedOption?.value
                                    });
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
                                  type='number'
                                  placeholder='Código Postal'
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
                              <FormLabel>Dirección Empresa</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Dirección Empresa'
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
                      {CheckboxForm.map((item, index) => (
                        <Controller
                          key={index}
                          // @ts-ignore
                          name={item.id}
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <div
                                className='col-span-12 lg:col-span-4'
                                key={item.id}
                              >
                                <Checkbox
                                  onCheckedChange={checked => {
                                    // @ts-ignore
                                    form.setValue(item.id, !field.value);
                                  }}
                                  // @ts-ignore
                                  checked={field.value}
                                >
                                  {item.label}
                                </Checkbox>
                              </div>
                            );
                          }}
                        />
                      ))}

                      <hr />
                      <div className='col-span-12'></div>

                      <div className='col-span-12 lg:col-span-6'>
                        <FormField
                          control={form.control}
                          name='tax_regime'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Régimen Tributario</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Régimen Tributario'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.tax_regime
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
                          name='type_account'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Tipo de Cuenta</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  // @ts-ignore
                                  options={accountTypes}
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
                          name='bank'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Banco</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Nombre del Banco'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.bank
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
                          name='account_number'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Cuenta</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Número de Cuenta'
                                  {...field}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.account_number
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
                          name='attached_documents'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Documentos Anexos</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Documentos Anexos'
                                  multiple={true}
                                  type='file'
                                  {...field}
                                  onChange={onFileChange}
                                  className={cn('', {
                                    'border-destructive focus:border-destructive':
                                      form.formState.errors.attached_documents
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
                          name='payment_option'
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <FormItem>
                              <FormLabel>Medio de pago</FormLabel>
                              <FormControl>
                                <SelectReact
                                  className='react-select'
                                  classNamePrefix='select'
                                  options={type_payment}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                  {activeStep === 3 && (
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
                              name={`contact_info.${index}.email`}
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
                                            .contact_info?.[0]?.email
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
                                      placeholder='Teléfono'
                                      type='number'
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
                              name={`contact_info.${index}.position`}
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
                                            .contact_info?.[0]?.position
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
                              email: '',
                              alternate_email: '',
                              position: ''
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
                      Guardar Proveedor
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

export default SupplierCreate;
