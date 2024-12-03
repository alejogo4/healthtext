'use client';
import { BaseType } from '@/views/design/base/services/crudBase';
import { FC } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

import Image from 'next/image';

import book1 from '@/public/images/all-img/book-1.png';
import book2 from '@/public/images/all-img/book-2.png';
import book3 from '@/public/images/all-img/book-3.png';
import book4 from '@/public/images/all-img/book-4.png';
import book5 from '@/public/images/all-img/book-5.png';
import book6 from '@/public/images/all-img/book-6.png';

import { Controller, useForm, useFormContext } from 'react-hook-form';

type Props = {
  bases: BaseType[] | [];
};

const Step1: FC<Props> = ({ bases = [] }) => {

  const images = [{ image: book1 }, { image: book2 }, { image: book3 }, { image: book4 }, { image: book5 }, { image: book6 }];

  // React Hook Form
  const { control, setValue, watch } = useFormContext();

  const base_id = watch('base_id');

  return (
    <div className='mt-4'>
      <h3 className='text-xl font-medium text-default-800 mb-5'>
        Seleccionar la base
      </h3>
      <div className='flex flex-wrap gap-6'>
        {bases.map((option, index) => (
          <label
            key={option.id}
            htmlFor={option.id.toString()}
            className={cn(
              'min-w-[166px] min-h-[165px] bg-default-100 flex flex-col justify-center items-center rounded-md relative border border-none cursor-pointer',
              {
                'border-solid border-primary': base_id === option.id.toString()
              }
            )}
          >
            {/* Componente controlado por RHF */}
            <Controller
              name='base_id'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={option.id.toString()}
                  type='radio'
                  value={option.id}
                  className='absolute top-3 left-3 opacity-0'
                  onChange={e => {
                    field.onChange(e.target.value);
                    setValue('base_id', e.target.value);
                    setValue('category_bases_code', option.category_bases.code);
                    setValue('category_base_id', option.category_base_id);
                  }}
                />
              )}
            />
            <Checkbox
              value={option.id.toString()}
              id={option.id.toString()}
              radius='xl'
              variant='outline'
              checked={base_id === option.id.toString()}
              className={cn('absolute top-3 left-3 opacity-0 invisible', {
                'visible opacity-100': base_id === option.id.toString()
              })}
            />
            <div className='h-16 w-16'>
              <Image
                src={images[index].image}
                alt={`Image of ${option.name}`}
                className='h-full w-full object-cover'
                width={64}
                height={64}
              />
            </div>
            <span className='text-base normal-case font-medium text-default-800 mt-1.5 inline-block'>
              {option.name}
            </span>
            <span className='text-xs normal-case text-default-800 mt-1.5 inline-block'>
              {option.category_bases.name} ({option.category_bases.code})
            </span>
            <span className='text-xs normal-case text-default-800 mt-1.5 inline-block'>
              {option.gender_types.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Step1;
