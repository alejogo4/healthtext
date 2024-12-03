'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FC } from 'react';

import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CategoryBase } from '../../services/categoriesBase';
import { z } from 'zod';
import { convertFileToBase64, getImage } from '@/util/file';
import { editBaseCategory } from '../../services/crudCategoriesBase';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2),
  packing_instructions: z.string().min(2),
  packing_photo: z.any()
});

type Props = {
  categoriesBase: CategoryBase;
};

export interface FormType {
  name: string;
  packing_instructions: string;
  packing_photo: string;
}

const EditCategoryBase: FC<Props> = ({ categoriesBase }) => {
  const onSubmit = async (data: any) => {
    if (data.packing_photo instanceof File) {
      data.extension = data.packing_photo.name.split('.').pop() || '';
      data.packing_photo = await convertFileToBase64(data.packing_photo);

      data.packing_photo = data.packing_photo;
    }
    data.id = categoriesBase.id;

    const response = await editBaseCategory(data);
    if (response.status) {
      toast.success(response?.message);
    }
  };

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: categoriesBase?.name ?? '',
      packing_instructions: categoriesBase.packing_instructions
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    ...formMethods
  } = form;

  const { control } = form;

  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });

  const image = categoriesBase?.packing_photo;

  return (
    <div className='mt-4'>
      <Card className='p-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-12 gap-5'>
              <div className='col-span-12 lg:col-span-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la base</FormLabel>
                      <FormControl>
                        <Input placeholder='Nombre' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-12 lg:col-span-6'>
                <FormField
                  control={form.control}
                  name='packing_instructions'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrucciones de embalaje</FormLabel>
                      <FormControl>
                        <Input placeholder='Instrucciones' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-12 lg:col-span-6'>
                {image ? (
                  <img
                    src={getImage(image)}
                    alt='Foto de empaque'
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
                <FormField
                  control={form.control}
                  name='packing_photo'
                  render={({ field }) => (
                    <FormItem className='mt-4'>
                      <FormLabel>Agregar Foto</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          accept='image/*'
                          multiple={false}
                          onChange={e => {
                            field.onChange(e.target.files?.[0] || '');
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button size='xs' variant='outline' type='submit' className='mt-4'>
              Guardar
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditCategoryBase;
