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
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
const Page = () => {
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
              All steps completed - you&apos;re finished
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
                    <div className='col-span-12 lg:col-span-6'>
                      <Label className='mb-3' htmlFor='birthday'>
                        Fecha de nacimiento
                      </Label>
                      <Input
                        aria-label='Fecha nacimiento'
                        name='birthday'
                        type='date'
                        placeholder='Fecha nacimiento'
                      />
                    </div>
                  </>
                )}

                {activeStep === 2 && (
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
                      <Input type='text' placeholder='Celular' />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                      <Input type='text' placeholder='Cargo Empresa' />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                      <Input type='email' placeholder='Correo Alternativo' />
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
      </Card>
    </div>
  );
};

export default Page;
