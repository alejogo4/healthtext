'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SilhouetteVariant } from '../../../services/crudVariants';

const Step5: FC = () => {
  // React Hook Form
  const { control, setValue, watch, getValues, register } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  const typeConfigServices = watch('typeConfigServices');

  const type_config: SilhouetteVariant[] = typeConfigServices.silhouettes;
  const measurementCategory = getValues('measurementCategory');

  useEffect(() => {
    console.log(typeConfigServices);
    if (type_config && !hasFetched.current) {
      hasFetched.current = true;
      setValue(
        'typeConfigServices.silhouettes',
        type_config.map((type: SilhouetteVariant) => ({
          ...type,
          sizes: typeConfigServices.sizes.map((size: any) => ({
            ...size,
            categories: measurementCategory.map((measurement: any) => ({
              ...measurement,
              value: ''
            }))
          }))
        }))
      );
    }
  }, []);

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className='mt-4'>
      <h3 className='text-xl font-medium text-default-800 mb-5'>
        Tabla de medidas
      </h3>

      <div className='w-full'>
        <div className='flex flex-col gap-2 flex-wrap'>
          <div className='flex flex-col'>
            {type_config.map((type: any, typeIndex: number) => (
              <>
                <h3
                  key={type.id}
                  className='font-semibold text-gray-700 mt-4 text-primary text-base'
                >
                  {type.silhouettes.name}
                </h3>

                <div className='w-full'>
                  {type?.sizes &&
                    type.sizes?.map((typeSize: any, sizeIndex: any) => (
                      <div
                        key={typeSize.size_id}
                        className='my-2 border-primary border p-2 rounded-md'
                      >
                        <h4 className='font-semibold text-gray-700'>
                          Talla {typeSize.sizes.name}
                        </h4>
                        <div className='flex '>
                          {measurementCategory.map(
                            (_: any, fieldIndex: number) => (
                              <Controller
                                key={fieldIndex}
                                name={`typeConfigServices.silhouettes.${typeIndex}.sizes.${sizeIndex}.categories.${fieldIndex}.value`}
                                control={control}
                                render={({ field }) => (
                                  <div className='flex flex-col mr-4'>
                                    <label
                                      htmlFor={`typeConfigServices.silhouettes.${typeIndex}.sizes.${sizeIndex}.categories.${fieldIndex}.value`}
                                      className='text-sm text-gray-600'
                                    >
                                      {_.name}
                                    </label>
                                    <input
                                      type='text'
                                      {...register(`typeConfigServices.silhouettes.${typeIndex}.sizes.${sizeIndex}.categories.${fieldIndex}.value`)}
                                      className='border rounded p-2'
                                    />
                                  </div>
                                )}
                              />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
