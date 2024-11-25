'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const FILES = [
  {
    name: 'technical_drawing',
    title: 'Dibujo técnico'
  },
  {
    name: 'exploded_drawing',
    title: 'Dibujo despiece'
  },
  {
    name: 'specific_drawing',
    title: 'Dibujo específico'
  }
];

const Step4: FC = () => {
  // React Hook Form
  const { control, setValue, watch, register, getValues } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const hasFetched = useRef(false);

  const typeConfigServices = getValues('typeConfigServices');

  const type_config = typeConfigServices.silhouettes;

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className='mt-4'>
      <h3 className='text-xl font-medium text-default-800 mb-5'>Cargar archivos</h3>

      <div className='w-full'>
        <div className='w-full'>
          <div className='flex flex-col my-4'>
            <Label className='mb-1' htmlFor={`mold_file`}>
              Molde
            </Label>
            <Input
              type='file'
              {...register(`mold_file`)}
              className='border rounded p-1'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {type_config && type_config.map((config: any, index: number) => {
              return (
                <div
                  key={config.id}
                  className='border-primary border p-4 w-full rounded-md space-y-2'
                >
                  <h3 className='font-semibold text-primary text-base mb-4'>
                    Archivos: {config.silhouettes.name}
                  </h3>

                  {/* Iterar sobre los 3 campos de archivo */}
                  {FILES.map((data, fileIndex) => (
                    <div key={fileIndex} className='flex flex-col mt-4'>
                      <Label
                        className='text-primary-500 mb-1'
                        htmlFor={`typeConfigServices.silhouettes.${index}.files.${fileIndex}`}
                      >
                        Archivo {data.title}
                      </Label>
                      <Input
                        type='file'
                        id={`typeConfigServices.silhouettes.${index}.files.${fileIndex}`}
                        {...register(`typeConfigServices.silhouettes.${index}.files.${fileIndex}`)}
                        className='border rounded p-1'
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
