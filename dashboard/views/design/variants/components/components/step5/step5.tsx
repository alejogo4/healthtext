'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { arrayToReactSelect } from '@/util/arrayToSelect';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SelectReact from 'react-select';

const Step5: FC = () => {
  // React Hook Form
  const { control, setValue, watch, getValues } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  const type_config = watch('typeConfig');
  const type_size = getValues('typeSize');

  useEffect(() => {
    if (type_config && !hasFetched.current) {
      hasFetched.current = true;
      setValue(
        'typeConfig',
        type_config.map((type: any) => ({
          ...type,
          selected: type.selected || false,
          hasZipper: type.hasZipper || false,
          typeSizes: type_size.map((size: any) => ({
            ...size,
            categories: Array(4).fill(null)
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
                <h3 className='font-semibold text-gray-700 mt-4 text-primary text-base'>{type.name}</h3>

                {type?.selected && (
                  <div className='w-full'>
                    {type?.typeSizes &&
                      type.typeSizes?.map(
                        (typeSize: any, sizeIndex: any) =>
                          typeSize.selected && (
                            <div key={typeSize.sizeId} className='my-2 border-primary border p-2 rounded-md'>
                              <h4 className='font-semibold text-gray-700'>
                                Talla {typeSize.name}
                              </h4>
                              <div className='flex '>
                                {typeSize.categories.map(
                                  (_: any, fieldIndex: number) => (
                                    <Controller
                                      key={fieldIndex}
                                      name={`typeConfig.${typeIndex}.typeSizes.${sizeIndex}.categories.${fieldIndex}`}
                                      control={control}
                                      render={({ field }) => (
                                        <div className='flex flex-col mr-4'>
                                          <label
                                            htmlFor={`typeConfig.${typeIndex}.typeSizes.${sizeIndex}.categories.${fieldIndex}`}
                                            className='text-sm text-gray-600'
                                          >
                                            Campo {fieldIndex + 1}
                                          </label>
                                          <input
                                            type='text'
                                            {...field}
                                            className='border rounded p-2'
                                          />
                                        </div>
                                      )}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          )
                      )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
