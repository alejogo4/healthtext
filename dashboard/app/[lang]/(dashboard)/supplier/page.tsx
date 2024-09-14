'use client';
import React from 'react';
import { Stepper, Step, StepLabel } from '@/components/ui/steps';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


import SelectReact from 'react-select';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { faker } from '@faker-js/faker';
import { Checkbox } from '@/components/ui/checkbox';
const Page = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = ['Datos Básicos', 'Dirección', 'Datos Fiscales', 'Contactos'];

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
              Reset
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='col-span-12 mb-6 mt-6'>
            <h4 className='text-sm font-medium text-default-600'>
              Ingresa la información del proveedor
            </h4>
            <p className='text-xs text-default-600 mt-1'>
              Ingresa cada uno de los campos que se requieren
            </p>
          </div>
          <form>
            <div className='grid grid-cols-12 gap-5'>
              {activeStep === 0 && (
                <>
                  <div className='col-span-12 lg:col-span-6'>
                    <SelectReact
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={type_supplier[0]}
                      options={type_supplier}
                    />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='NIT/Documento' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Nombre/Razón Social' />
                  </div>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='País' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Departamento' />
                  </div>
                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Ciudad' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Barrio' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Código Postal' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Dirección Empresa' />
                  </div>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_1'>
                      ¿Está registrado en el régimen simple de tributación?
                    </Checkbox>
                  </div>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_2'>¿Es gran contribuyente?</Checkbox>
                  </div>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_3'>¿Es responsable de IVA?</Checkbox>
                  </div>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_4'>
                      En la venta NO POS causar RETEIVA a Resp. de IVA no
                      registrado en el Rég. Simple
                    </Checkbox>
                  </div>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_5'>
                      En la venta NO POS causar RETEIVA a Resp. de IVA
                      registrado en el Rég. Simple
                    </Checkbox>
                  </div>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_6'>
                      En la venta NO POS causar RETENCIÓN EN LA FUENTE por renta
                    </Checkbox>
                  </div>
                  <div className='col-span-12 lg:col-span-4'>
                    <Checkbox id='checkbox_7'>
                      En la venta NO POS causar RETENCIÓN EN LA FUENTE por ICA
                    </Checkbox>
                  </div>
                  <hr />
                  <div className='col-span-12'></div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Régimen Tributario' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Datos Bancarios' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Documentos Anexos' />
                  </div>
                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Nacionalidad' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <SelectReact
                      className='react-select'
                      classNamePrefix='select'
                      options={type_payment}
                      placeholder='Opción de pago'
                    />
                  </div>
                </>
              )}
              {activeStep === 3 && (
                <>
                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Nombre' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='email' placeholder='Correo' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Extensión' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Teléfono' />
                  </div>


                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Cargo Empresa' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Celular' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='email' placeholder='Correo Alternativo' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Website' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Facebook' />
                  </div>

                  <div className='col-span-12 lg:col-span-6'>
                    <Input type='text' placeholder='Twitter' />
                  </div>
                </>
              )}
            </div>
          </form>

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
              {activeStep === steps.length - 1 ? (
                <Button
                  size='xs'
                  variant='outline'
                  color='success'
                  className='cursor-pointer'
                  onClick={() => {
                    if (onSubmit) onSubmit();
                    handleNext();
                  }}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  size='xs'
                  variant='outline'
                  color='secondary'
                  className='cursor-pointer'
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Page;
