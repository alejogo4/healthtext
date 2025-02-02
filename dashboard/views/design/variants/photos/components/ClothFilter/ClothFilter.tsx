'use client';
import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';

import SelectReact from 'react-select';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { Controller, useForm } from 'react-hook-form';

import { arrayToReactSelect } from '@/util/arrayToSelect';
import {
  listCategory,
  listLinea,
  listSubCategory,
  listSupplier,
  searchSupplies
} from '@/views/purchase/services/services';
import { ItemVariantDetail } from '@/views/types/variants';
import {
  ClothPhoto,
  getSupplyTypes,
  ListSuppliesI,
  saveClothPhoto,
  Silhouette,
  Variant
} from '../../../services/crudPhotos';
import { extractExtensionFromBase64 } from '@/util/file';

type Props = {
  variant: ItemVariantDetail;
  onNextStep : ()=>void;
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
  supplier: { value: string; label: string };
  supply_type: { value: string; label: string };
  category?: { value: string; label: string };
  subCategory?: { value: string; label: string };
  line?: { value: string; label: string };
  color?: { value: string; label: string };
}

const ClothFilter: FC<Props> = ({ variant, onNextStep }) => {
  const [supplierList, setSupplierList] = useState<any[]>([]);
  const [supplyType, setSupplyType] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubcategories] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  const [listSuppliesTable, setListSuppliesTable] = useState<ListSuppliesI[]>(
    []
  );

  const [listSuppliesAdded, setListSuppliesAddedd] = useState<Variant[]>([]);

  const [filter, setFilter] = useState<FormType>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [supplier, typeSupply] = await Promise.all([
          listSupplier(),
          getSupplyTypes('1')
        ]);

        setSupplierList(supplier);
        setSupplyType(typeSupply);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setVariantType();
    fetchData();
  }, []);

  const setVariantType = () => {
    if (variant.pattern_base.category_bases.code == 'B') {
      const variantConfig: Variant[] = variant.silhouettes.map(element => {
        return {
          id: element.id.toString(),
          garment_variant_id: element.garment_variant_id.toString(),
          name: element.silhouettes.name,
          insumos: []
        };
      });
      setListSuppliesAddedd(variantConfig);
    } else if (variant.pattern_base.category_bases.code == 'P') {
      const variantConfig: Variant[] = variant.boot_types.map(element => {
        return {
          id: element.boot_type_id.toString(),
          garment_variant_id: element.garment_variant_id.toString(),
          name: element.boot_type.name,
          insumos: []
        };
      });
      setListSuppliesAddedd(variantConfig);
    } else {
      const variantConfig: Variant[] = [
        {
          id: '0',
          garment_variant_id: '0',
          name: 'Agregar telas',
          insumos: []
        }
      ];
      setListSuppliesAddedd(variantConfig);
    }
  };

  const onSubmit = async (data: FormType) => {
    setFilter(data);
    const supplies = await searchSupplies({
      supplier_id: data.supplier.value,
      supply_type_id: data.supply_type.value,
      supply_category_id: data.category?.value || '',
      supply_subcategory_id: data.subCategory?.value || '',
      supply_line_id: data.line?.value || '',
      supply_color_id: data.color?.value || ''
    });

    setListSuppliesTable(supplies);
  };

  const form = useForm<FormType>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    ...formMethods
  } = form;

  const { control } = form;

  const supplyTypeW = watch('supply_type');
  const supplierW = watch('supplier');

  const onChangeTypeSupply = async (selectedOption: {
    value?: string;
    label?: string;
  }) => {
    const categories = await listCategory('CLOTH');

    setCategories(categories);
    const [linea, subcategory] = await Promise.all([
      listLinea(),
      listSubCategory('CLOTH')
    ]);

    setLines(linea);
    setSubcategories(subcategory);
  };

  const onAddItem = (item: ListSuppliesI) => {
    const insumosList: Variant[] = listSuppliesAdded.map(variant => {
      const insumoExists = variant.insumos.some(
        insumo => insumo.id === item.supply_inventory_id.toString()
      );
      if (insumoExists) {
        return {
          ...variant
        };
      }

      return {
        ...variant,
        insumos: [
          ...variant.insumos,
          {
            id: item.supply_inventory_id.toString(),
            name: `${item.supply_type} ${item.supply_category} ${item.supply_subcategory} ${item.supply_line} ${item.width}X${item.heigth} ${item.supply_color}`,
            color: item.supply_color,
            photoBase64: '',
            extension: ''
          }
        ]
      };
    });

    setListSuppliesAddedd(insumosList);
  };

  const handleDelete = (index: string) => {
    const updatedItems = listSuppliesAdded.map(variant => ({
      ...variant,
      insumos: variant.insumos.filter(insumo => insumo.id !== index)
    }));

    setListSuppliesAddedd(updatedItems);
  };

  const handleAddPhoto = async (variantIndex: number, insumoId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (target.files && target.files[0]) {
        const file = target.files[0];
        
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;

          setListSuppliesAddedd(prevVariants => {
            const updatedVariants = [...prevVariants];

            updatedVariants[variantIndex].insumos = updatedVariants[
              variantIndex
            ].insumos.map(insumo =>
              insumo.id === insumoId
                ? { ...insumo, photoBase64: base64String, extension: extractExtensionFromBase64(base64String) ?? '' }
                : insumo
            );

            return updatedVariants;
          });
        };

        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const onSaveImage = async () => {
    if (listSuppliesAdded.length > 0) {
      let supply = listSuppliesAdded[0];
      const clothPhoto: ClothPhoto[] = supply.insumos.map(value => {
        const silhouettes: Silhouette[] = listSuppliesAdded.map(element => {
          return {
            garment_variant_id: parseInt(element.garment_variant_id),
            silhouettes_variant_id: parseInt(element.id),
            photoBase64: value.photoBase64 ?? '',
            extension: value.extension ?? ''
          };
        });
        return {
          supply_inventory_id: parseInt(value.id),
          silhouettes,
          boot_types: [],
          others: []
        };
      });
      setLoading(true);
      const results = await Promise.all(
        clothPhoto.map(async item => {
          const response = await saveClothPhoto(item);
          return response;
        })
      );
      setLoading(false);
      onNextStep();
    }
  };

  return (
    <div className='mt-8'>
      <div className='grid grid-cols-[1fr_2fr] gap-4 mt-5'>
        <Card className='pb-4'>
          <CardHeader>
            <CardTitle className='text-lg'>Filtrar </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={form.control}
                  name='supplier'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Proveedor</FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(supplierList)}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name='supply_type'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem className='mt-3'>
                      <FormLabel>Tipo de insumo</FormLabel>
                      <FormControl>
                        <SelectReact
                          className='react-select'
                          classNamePrefix='select'
                          options={arrayToReactSelect(supplyType)}
                          onChange={selectedOption => {
                            onChangeTypeSupply({
                              label: selectedOption?.label,
                              value: selectedOption?.value
                            });
                            onChange(selectedOption);
                          }}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {supplyTypeW?.value && (
                  <>
                    <Controller
                      control={form.control}
                      name='category'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Categoría</FormLabel>
                          <FormControl>
                            <SelectReact
                              className='react-select'
                              classNamePrefix='select'
                              options={arrayToReactSelect(categories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name='subCategory'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Subcategoría</FormLabel>
                          <FormControl>
                            <SelectReact
                              className='react-select'
                              classNamePrefix='select'
                              options={arrayToReactSelect(subCategories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name='line'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem className='mt-3'>
                          <FormLabel>Línea</FormLabel>
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
                  </>
                )}

                {supplyTypeW?.value && supplierW?.value && (
                  <div className='col-span-2 mt-4'>
                    <Button className='float-right' type='submit'>
                      Buscar Insumo
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Telas encotradas</CardTitle>
            </CardHeader>
            <CardContent>
              {listSuppliesTable.length === 0 ? (
                <p>No existen filtros de búsqueda</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='font-semibold'>Insumos</TableHead>
                      <TableHead className='font-semibold'>
                        Unidad de medida
                      </TableHead>
                      <TableHead className='font-semibold'>
                        Color Proveedor
                      </TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listSuppliesTable.map(item => (
                      <TableRow key={item.supply_inventory_id}>
                        <TableCell>
                          {item.supply_type} {item.supply_category}{' '}
                          {item.supply_subcategory} {item.supply_line}{' '}
                          {`${item.width}X${item.heigth}`}
                          {item.supply_color}
                        </TableCell>
                        <TableCell>{item.supply_unit_of_measure}</TableCell>
                        <TableCell>{item.supply_color_supplier}</TableCell>
                        <TableCell className='flex justify-end'>
                          <div className='flex gap-3'>
                            <Button
                              size='icon'
                              variant='outline'
                              className=' h-7 w-7'
                              color='secondary'
                              onClick={() => onAddItem(item)}
                            >
                              <Icon
                                icon='heroicons:plus'
                                className=' h-4 w-4  '
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {listSuppliesAdded.map((variant, id) => {
            return (
              <Card className='mt-2' key={id}>
                <CardHeader>
                  <CardTitle className='text-base'>{variant.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {variant.insumos.length === 0 ? (
                    <p>No hay insumos agregados</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='font-semibold'>
                            Insumos
                          </TableHead>

                          <TableHead className='font-semibold'>
                            Color Proveedor
                          </TableHead>

                          <TableHead className='font-semibold'>Foto</TableHead>

                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variant.insumos.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>

                            <TableCell>{item.color}</TableCell>
                            <TableCell>
                              {item.photoBase64 && (
                                <img
                                  src={item.photoBase64}
                                  alt='Preview'
                                  className='w-16 h-16 object-cover'
                                />
                              )}
                            </TableCell>

                            <TableCell className='flex justify-end'>
                              <Button
                                size='icon'
                                variant='outline'
                                className='w-[120px] h-7 mr-4'
                                color='secondary'
                                onClick={() => handleAddPhoto(id, item.id)}
                              >
                                <Icon
                                  icon='heroicons:photo'
                                  className=' h-4 w-4  mr-2'
                                />
                                Agregar foto
                              </Button>
                              <div className='flex gap-3'>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size='icon'
                                      variant='outline'
                                      className=' h-7 w-7'
                                      color='secondary'
                                    >
                                      <Icon
                                        icon='heroicons:trash'
                                        className=' h-4 w-4  '
                                      />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Confirmación
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Deseas eliminar este item de la órden de
                                        compra?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className=' bg-destructive'>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className='bg-primary'
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        Ok
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            );
          })}
          <div className='flex justify-end w-100'>
            <Button
              className='mt-8'
              size='xs'
              color='primary'
              onClick={onSaveImage}
            >
              Guardar y continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothFilter;
