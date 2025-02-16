'use client';
import { Step, StepLabel, Stepper } from '@/components/ui/steps';
import { useMediaQuery } from '@/hooks/use-media-query';
import React, { FC, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { ItemVariantDetail } from '@/views/types/variants';
import { getDetailVariant, VariantResponse } from '../../services/crudVariants';
import ClothFilter from './components/ClothFilter/ClothFilter';
import BiaFilter from './components/BiaFilter/BiaFilter';
import SeamFilter from './components/SeamFilter/SeamFilter';
import { toast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';

type Props = {
  id: string;
};

const CostCreate: FC<Props> = ({ id }) => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const [selectedItem, setSelectedItem] = useState<ItemVariantDetail | null>(
    null
  );

  const steps = ['Fotos tela', 'Fotos sesgos', 'Fotos costuras', 'Finalizar'];

  const onViewData = async () => {
    const data = await getDetailVariant(parseInt(id));
    if (data) {
      setSelectedItem(data);
    }
  };

  useEffect(() => {
    onViewData();
  }, []);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if (activeStep == 2) {
      toast({
        title: 'Fotos guardadas correctamente'
      });
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
        {activeStep === 0 && selectedItem && (
          <ClothFilter variant={selectedItem} onNextStep={() => handleNext()} />
        )}
        {activeStep === 1 && selectedItem && (
          <BiaFilter variant={selectedItem} onNextStep={() => handleNext()} />
        )}
        {activeStep === 2 && selectedItem && (
          <SeamFilter variant={selectedItem} onNextStep={() => handleNext()} />
        )}
        {activeStep === 3 && (
          <div className='mt-2 mb-2 font-semibold text-center'>
            Fotos cargadas correctamente
          </div>
        )}
      </Card>
    </div>
  );
};

export default CostCreate;
