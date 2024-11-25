'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import SelectReact from 'react-select';
import {
  getBoot,
  getLenght,
  getLines,
  getMeasurementCategory,
  getSilhouette,
  getSizeCategory
} from '../../../services/crudVariants';
import { BaseType } from '@/views/design/base/services/crudBase';
import { Master } from '@/views/types/master';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { arrayToReactSelect } from '@/util/arrayToSelect';

type Props = {
  bases: BaseType[] | [];
};

const Step2: FC<Props> = ({ bases = [] }) => {
  // React Hook Form
  const { control, setValue, watch } = useFormContext();

  const [typeConfig, setTypeConfig] = useState<Master[]>([]);
  const [typeSize, setTypeSize] = useState<Master[]>([]);
  const [typeLenght, setTypeLenght] = useState<Master[]>([]);
  const [lines, setLines] = useState<Master[]>([]);
  const [titleConfig, setTitleConfig] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const hasFetched = useRef(false);

  const category_base_id = watch('category_base_id');
  const category_bases_code = watch('category_bases_code');

  useEffect(() => {
    if (!hasFetched.current && category_bases_code && category_base_id) {
      fetchData();
      fetchLines();
      hasFetched.current = true;
    }
  }, [category_bases_code, category_base_id]);

  const fetchData = async () => {
    setIsLoading(true);
    const length = await getLenght(category_base_id);
    const size = await getSizeCategory(category_base_id);
    const measurementCategory = await getMeasurementCategory(category_base_id);
    try {
      if (category_bases_code === 'B') {
        const config = await getSilhouette();

        setValue(
          'typeConfig',
          config.map(item => ({ ...item, selected: true }))
        );

        setTypeConfig(config);
        setTitleConfig('Seleccionar Siluetas');
      } else if (category_bases_code === 'P') {
        const config = await getBoot();
        //const length = await getLenght(category_base_id);
        setTypeConfig(config);
        setTitleConfig('Seleccionar Bota');
        setValue(
          'typeConfig',
          config.map(item => ({ ...item, selected: true }))
        );
      }

      setTypeLenght(length);
      setValue(
        'typeLenght',
        length.map(item => ({ ...item, selected: true }))
      );

      setTypeSize(size);
      setValue(
        'typeSize',
        size.map(item => ({ ...item, selected: true }))
      );

      setValue('measurementCategory', measurementCategory);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLines = async () => {
    setIsLoading(true);
    try {
      const lines = await getLines();
      setLines(lines);
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

      <Controller
        control={control}
        name='line_id'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormItem>
            <FormLabel>Seleccionar linea</FormLabel>
            <FormControl>
              <SelectReact
                className='react-select'
                classNamePrefix='select'
                options={arrayToReactSelect(lines)}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <div className='w-full'>
          <h5 className='text-base font-medium text-default-800 mb-2'>
            {titleConfig}
          </h5>
          <div className='flex flex-col gap-2 flex-wrap'>
            <div className='flex flex-col gap-4'>
              {typeConfig.map((type, index) => (
                <div
                  key={type.id}
                  className={cn('flex flex-col gap-2', {
                    'border-primary border rounded-md': watch(
                      `typeConfig.${index}.selected`
                    )
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
          <h5 className='text-base font-medium text-default-800 mb-2'>
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
      <div className='w-full my-6'>
        <h5 className='text-base font-medium text-default-800 mb-2'>
          Seleccionar tallas
        </h5>
        <div className='flex flex-col gap-2 flex-wrap'>
          {typeSize.map((typeSize, index) => (
            <Controller
              key={typeSize.id}
              name={`typeSize.${index}.selected`}
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
                      {typeSize.name}
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
