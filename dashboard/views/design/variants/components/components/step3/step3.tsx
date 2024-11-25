'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Master } from '@/views/types/master';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getEmbroideries } from '../../../services/crudVariants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Step3: FC = () => {
  // React Hook Form
  const { control, setValue, watch, register } = useFormContext();

  const [embroideries, setEmbroideries] = useState<Master[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasFetched = useRef(false);

  const category_base_id = watch('category_base_id');
  const category_bases_code = watch('category_bases_code');

  useEffect(() => {
    if (!hasFetched.current && category_bases_code && category_base_id) {
      fetchData();
      hasFetched.current = true;
    }
  }, [category_bases_code, category_base_id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const embroideries = await getEmbroideries(category_base_id);
      setEmbroideries(embroideries);
      setValue(
        'embroideries',
        embroideries.map(item => ({ ...item, selected: false, description: '' }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className='mt-4'>
      <h3 className='text-xl font-medium text-default-800 mb-5'>Bordados</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <div className='w-full'>
          <h5 className='text-base font-medium text-default-800 mb-2'>
            Seleccionar bordados
          </h5>
          <div className='flex flex-col gap-2 flex-wrap'>
            <div className='flex flex-col gap-4'>
              {embroideries.map((type, index) => (
                <div
                  key={type.id}
                  className={cn('flex flex-col gap-2', {
                    'border-primary border rounded-md p-2': watch(
                      `embroideries.${index}.selected`
                    )
                  })}
                >
                  {/* Control para Selección */}
                  <Controller
                    name={`embroideries.${index}.selected`}
                    control={control}
                    render={({ field }) => (
                      <div
                        className={cn(
                          'bg-default-100 h-8 px-2 rounded-md inline-flex flex-col justify-center',
                          {
                            'bg-primary/10': field.value
                          }
                        )}
                      >
                        <label className='flex items-center'>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={value => field.onChange(value)}
                          />
                          <span
                            className={cn('ml-2 text-default-600', {
                              'text-primary': field.value
                            })}
                          >
                            {type.name}
                          </span>
                        </label>
                      </div>
                    )}
                  />
                  {/* Render Condicional para Cremallera */}
                  {watch(`embroideries.${index}.selected`) && (
                    <Controller
                      name={`embroideries.${index}.description`}
                      control={control}
                      defaultValue=''
                      render={({ field, fieldState }) => (
                        <div className='col-span-2 flex flex-col gap-2'>
                          <Label htmlFor={`embroideries.${index}.description`}>
                            Descripción del bordado
                          </Label>
                          <Input
                            type='text'
                            id={`embroideries.${index}.id`}
            
                            {...register(`embroideries.${index}.description`)}
                            className={cn('peer', {
                              'border-destructive': fieldState.invalid
                            })}
                          />
                          {fieldState.error && (
                            <div className='text-destructive mt-2'>
                              {fieldState.error.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
