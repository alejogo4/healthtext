'use client';
import { Button } from '@/components/ui/button';
import { Step, StepLabel, Stepper } from '@/components/ui/steps';
import React, { FC } from 'react';

import { Card } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { BaseType } from '@/views/design/base/services/crudBase';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../../schema/formCreate';
import {
  EmbroideryRequest,
  MeasurementRequest,
  MoldAttachmentVariantRequest,
  saveBaseVariant,
  saveDrawSilhouette,
  saveEmbroidery,
  saveFilesVariant,
  saveMeasurement,
  SilhouetteAttachment,
  SilhouetteDrawRequest,
  SilhouetteVariant,
  VariantPayload,
  VariantResponse
} from '../../services/crudVariants';
import Step1 from '../components/step1/step1';
import Step2 from '../components/step2/step2';
import Step3 from '../components/step3/step3';
import Step4 from '../components/step4/step4';
import Step5 from '../components/step5/step5';
import { convertFileToBase64, removeFileExtension } from '@/util/file';
import { toast } from '@/components/ui/use-toast';

type Props = {
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
  base_id: string;
  category_bases_code: string;
  category_base_id: string;
  line_id: { value: string; label: string };
  typeLenght: any;
  typeConfig: any;
  typeConfigServices: any;
  typeSize: any;
  embroideries: any;
  variant_id?: number;
  mold_file: any;
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

function mapToMeasurementRequest(data: any): MeasurementRequest {
  return {
    sizes: data.map((item: any) => {
      return item.sizes.map((size: any) => ({
        silhouettes_variant_id: item.garment_variant_id,
        size_id: size.size_id,
        measurement_categories: size.categories.map((category: any) => ({
          measurement_category_id: category.id,
          value: parseFloat(category.value),
        })),
      }));
    }).flat(),
    lengths: [],
  };
}

const VariantCreate: FC<Props> = ({ bases = [] }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = [
    'Seleccionar Base',
    'Configurar Variantes',
    'Bordado',
    'Archivos',
    'Medidas'
  ];

  const onSubmit = async (data: any) => {

    console.log(data);
    const silhouettes = typeConfigServices.silhouettes;

    const body: MeasurementRequest = mapToMeasurementRequest(silhouettes);
    console.log(body);
    const response = await saveMeasurement(body);
    reset();
    handleNext();
    toast({
      title: response?.message
    });
  };
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const form = useForm<FormType>({});

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
    ...formMethods
  } = form;

  const base_id = watch('base_id');
  const line_id = watch('line_id');
  const typeLenght = watch('typeLenght');
  const typeConfig = watch('typeConfig');
  const typeConfigServices = watch('typeConfigServices');
  const typeSize = watch('typeSize');
  const category_bases_code = watch('category_bases_code');
  const embroideries = watch('embroideries');
  const variant_id = watch('variant_id');
  const mold_file = watch('mold_file');

  // const typePerson = watch('document_type_id');
  // const accept_information = watch('authorizes_receive_information');

  const { control } = form;

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const getConfigVariant = (type: string) => {
    if (category_bases_code === type) {
      if (category_bases_code == 'B') {
        return typeConfig
          .filter((e: any) => e.selected)
          .map((e: any) => {
            return {
              silhouette_id: e.id,
              has_zipper: e.hasZipper ?? false
            };
          });
      } else {
        return typeConfig
          .filter((e: any) => e.selected)
          .map((e: any) => {
            return {
              boot_type_id: e.id,
              has_zipper: e.hasZipper ?? false
            };
          });
      }
    } else {
      return [];
    }
  };

  const proccessFile = async (array: any[]) => {
    if (!array || array.length === 0) {
      console.error('No file provided.');
      return;
    }

    const file = array[0];
    const base64 = await convertFileToBase64(file);

    // Extraemos el nombre y extensión del archivo.
    const fileName = removeFileExtension(file.name);
    const fileExtension = file.name.split('.').pop() || '';

    return {
      base64,
      fileName,
      fileExtension
    };
  };

  const saveFilesVariantHandler = async () => {
    if (category_bases_code == 'B') {
      if (!mold_file || mold_file.length === 0) {
        console.error('No file provided.');
        return;
      }

      const file = mold_file[0];
      const base64Content = await convertFileToBase64(file);

      // Extraemos el nombre y extensión del archivo.
      const fileName = removeFileExtension(file.name);
      const fileExtension = file.name.split('.').pop() || '';

      const body_mold: MoldAttachmentVariantRequest = {
        garment_variant_id: variant_id ?? 0,
        attachments: [
          {
            name: fileName,
            extension: fileExtension,
            mold_base64: base64Content
          }
        ]
      };

      const sil: SilhouetteVariant[] = typeConfigServices.silhouettes;

      const attach = await Promise.all(
        sil.map(async (e: SilhouetteVariant) => {
          const technical_drawing = await proccessFile(e.files[0]);
          const exploded_drawing = await proccessFile(e.files[1]);
          const specific_drawing = await proccessFile(e.files[2]);

          return {
            silhouette_variant_id: e.id,
            attachments: [
              {
                name: technical_drawing?.fileName ?? '',
                technical_draw_base64: technical_drawing?.base64 ?? '',
                extension: technical_drawing?.fileExtension ?? ''
              },
              {
                name: exploded_drawing?.fileName ?? '',
                cut_layout_base64: exploded_drawing?.base64 ?? '',
                extension: exploded_drawing?.fileExtension ?? ''
              },
              {
                name: specific_drawing?.fileName ?? '',
                special_draw_base64: specific_drawing?.base64 ?? '',
                extension: specific_drawing?.fileExtension ?? ''
              }
            ]
          };
        })
      );

      const body_draw_files: SilhouetteDrawRequest = {
        silhouette_attachments: attach
      };
      const draw_files = await saveDrawSilhouette(body_draw_files);
      const mold_response = await saveFilesVariant(body_mold);

      return draw_files;
    }
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      const body: VariantPayload = {
        pattern_base_id: parseInt(base_id),
        silhouette: getConfigVariant('B'),
        boot_type: getConfigVariant('P'),
        size_ids:
          typeSize.filter((e: any) => e.selected).map((e: any) => e.id) ?? [],
        length_ids:
          typeLenght.filter((e: any) => e.selected).map((e: any) => e.id) ?? [],
        supply_line_id: parseInt(line_id.value)
      };

      const response = await saveBaseVariant(body);
      if (response) {
        setValue('variant_id', response?.id ?? 0);
        setValue('typeConfigServices', response);
      }
    }
    if (activeStep === 2) {
      const body: EmbroideryRequest = {
        embroidery_variant: embroideries
          .filter((e: any) => e.selected)
          .map((e: any) => {
            return {
              embroidery_id: e.id,
              garment_variant_id: variant_id,
              description: e.description
            };
          })
      };
      const response = saveEmbroidery(body);
    }

    if (activeStep === 3) {
      const response = await saveFilesVariantHandler();
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message?.toString()}</p>;
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
              Variante creada exitosamente
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
                  {activeStep === 0 && <Step1 bases={bases} />}
                  {activeStep === 1 && <Step2 bases={bases} />}
                  {activeStep === 2 && <Step3 />}
                  {activeStep === 3 && <Step4 />}
                  {activeStep === 4 && <Step5 />}
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
                      Guardar variante
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
