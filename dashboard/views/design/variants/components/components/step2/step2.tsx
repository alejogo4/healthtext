'use client';
import { FC, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

import {
  getBoot,
  getLenght,
  getSilhouette,
  getSizeCategory
} from '../../../services/crudVariants';
import { BaseType } from '@/views/design/base/services/crudBase';
import { Master } from '@/views/types/master';

type Props = {
  bases: BaseType[] | [];
};

const Step2: FC<Props> = ({ bases = [] }) => {
  const [typeConfig, setTypeConfig] = useState<Master[]>([]);
  const [typeSize, setTypeSize] = useState<Master[]>([]);
  const [typeLenght, setTypeLenght] = useState<Master[]>([]);
  const [titleConfig, setTitleConfig] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // React Hook Form
  const { control, setValue, watch } = useFormContext();

  const type_base_id = watch('type_base_id');
  const type_base = watch('type_base');

  useEffect(() => {
    if (type_base && type_base_id) {
      fetchData();
    }
  }, [type_base, type_base_id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (type_base === 'T') {
        const config = await getSilhouette();
        const length = await getLenght();
        setValue(
          'typeConf',
          config.map(item => ({ ...item, selected: true }))
        );
        setTypeLenght(length);
        setTypeConfig(config);
        setTitleConfig('Seleccionar Siluetas');
      } else if (type_base === 'P') {
        const config = await getBoot();
        const length = await getLenght();
        setTypeLenght(length);
        setTypeConfig(config);
        setTitleConfig('Seleccionar Bota');
      }

      const size = await getSizeCategory(type_base_id);
      setTypeSize(size);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className='mt-4'>
      <h3 className='text-xl font-medium text-default-800 mb-5'>
        Configuración variante
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='w-full'>
          <h5 className='text-lg font-medium text-default-800 mb-5'>
            {titleConfig}
          </h5>
          <div className='flex flex-col gap-2 flex-wrap'>
            <div className='flex flex-col gap-4'>
              {typeConfig.map((type, index) => (
                <div
                  key={type.id}
                  className={cn('flex flex-col gap-2', {
                    'border-primary border rounded-md': watch(`typeConfig.${index}.selected`)
                  })}
                >
                  {/* Control para Selección */}
                  <Controller
                    name={`typeConfig.${index}.selected`}
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
                  {watch(`typeConfig.${index}.selected`) && (
                    <Controller
                      name={`typeConfig.${index}.hasZipper`}
                      control={control}
                      defaultValue={false}
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
                              Tiene Cremallera
                            </span>
                          </label>
                        </div>
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full'>
          <h5 className='text-lg font-medium text-default-800 mb-5'>
            Seleccionar largo
          </h5>
          <div className='flex flex-col gap-2 flex-wrap'>
            {typeLenght.map((typeLenght, index) => (
              <Controller
                key={typeLenght.id}
                name={`typeLenght.${index}.selected`}
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
                        {typeLenght.name}
                      </span>
                    </label>
                  </div>
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h5 className='text-lg font-medium text-default-800 mb-5'>
          {titleConfig}
        </h5>
        <div className='flex flex-col gap-2 flex-wrap'>
          {typeConfig.map((typeConf, index) => (
            <Controller
              key={typeConf.id}
              name={`typeConf.${index}.selected`}
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
                      {typeConf.name}
                    </span>
                  </label>
                </div>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2;
