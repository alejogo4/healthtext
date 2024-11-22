'use client';
import { Button } from '@/components/ui/button';
import { Step, StepLabel, Stepper } from '@/components/ui/steps';
import React, { FC } from 'react';


import { Card } from '@/components/ui/card';
import {
  Form
} from '@/components/ui/form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { BaseType } from '@/views/design/base/services/crudBase';
import { CountryTypes } from '@/views/services/countries';
import { DocumentTypes } from '@/views/services/documentTypes';
import { PersonTypes } from '@/views/services/personType';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../../schema/formCreate';
import Step1 from '../components/step1/step1';
import Step2 from '../components/step2/step2';

type Props = {
  documentTypes: DocumentTypes[] | [];
  personTypes: PersonTypes[] | [];
  countries: CountryTypes[] | [];
  bases: BaseType[] | [];
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
  base_id: number;
  type_base: string;
  // document_type_id: { value: string; label: string };
  // document_number: string;
  // name: string;
  // payment_currency: { value: string };
  // country: { value: string; label: string };
  // department: { value: string; label: string };
  // city: { value: string; label: string };
  // neighborhood: string;
  // postal_code: string;
  // full_address: string;
  // email: string;
  // where_authorize: { value: string };
  // way_to_meet_them: { value: string };
  // profession_specialty: string;
  // authorizes_receive_information: boolean;
  // date_birth: 'string';
  // contact_info: ContactInfo[];
}

const way_to_meet_them = [
  { value: 'social_media', label: 'Redes Sociales' },
  { value: 'recommendation', label: 'Recomendación' },
  { value: 'advertising', label: 'Publicidad' },
  { value: 'direct_contact', label: 'Contacto Directo' }
];


const VariantCreate: FC<Props> = ({ documentTypes, personTypes, countries, bases =[] }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [departments, setDepartments] = React.useState<any>([]);
  const [cities, setCities] = React.useState<any[]>([]);

  const steps = ['Seleccionar Base', 'Configurar Variantes', 'Bordado', 'Archivos' , 'Medidas'];

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
    console.log(data);
    // const response = await createClient(mapFormToClientCreate(data));
    // handleNext();
    // toast({
    //   title: response?.message
    // });
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

  // const typePerson = watch('document_type_id');
  // const accept_information = watch('authorizes_receive_information');

  const { control } = form;


  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });


 

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
                Ingresa la información de la variante
              </h4>
              <p className='text-xs text-default-600 mt-1'>
                Ingresa cada uno de los campos que se requieren
              </p>
            </div>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full'>
                  {activeStep === 0 && (
                    <Step1 bases={bases}/>
                  )}
                  {activeStep === 1 && (
                    <Step2 bases={bases}/>
                  )}
                  {activeStep === 2 && (
                   <p>Hola</p>
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
            </FormProvider>

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

export default VariantCreate;
