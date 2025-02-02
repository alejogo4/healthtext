'use client';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { SetList } from '@/views/types/sets';
import { ListSet } from './services/crudSet';
import { getImage } from '@/util/file';

const SetListPage = () => {
  const [data, setData] = useState<SetList[] | []>([]);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState<SetList | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await ListSet();
    setData(_data);
  };

  const onViewData = (row: SetList) => {
    setIsModalOpen(true);
    setSelectedItem(row);
  };

  const columnsdt: ColumnDef<SetList>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Nombre' />
      ),
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Descripción' />
      ),
      cell: ({ row }) => <div>{row.getValue('description')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'gender_types', // El objeto completo
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Género' />
      ),
      cell: ({ row }) => {
        //const gender = row.getValue('gender_types');
        const gender = null;
        return <div>{gender || 'Sin género'}</div>;
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'category_bases',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Categoria' />
      ),
      cell: ({ row }) => {
        //const gender = (row.getValue('category_bases') as CategoryBases)?.name;
        const gender = null;
        return <div>{gender || 'Sin base asociada'}</div>;
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          onPressView={() => onViewData(row.original)}
          onPressDelete={onDeleteItem}
          id={row.original.id.toString()}
          row={row}
        />
      )
    }
  ];

  const onDeleteItem = async (id: string) => {
    // let response = await deleteBase(id);
    // if (response?.status) {
    //   getData();
    //   toast.success(response?.message);
    // }
  };

  return (
    <>
      <Card className='py-4 px-2'>
        {data.length > 0 && <DataTable data={data} columns={columnsdt} />}
      </Card>
      <Dialog open={isModalOpen}>
        <DialogContent
          className='overflow-y-auto max-h-screen p-0'
          size='4xl'
          onClose={() => setIsModalOpen(!open)}
        >
          <div className='w-full h-[80vh] overflow-scroll p-4'>
            {selectedItem && (
              <div className='w-full'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
                  {selectedItem.name}
                </h2>

                <div className='space-y-6'>
                  {/* Información General */}
                  <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      Información General
                    </h3>
                    <ul className='space-y-2 text-gray-600 text-lg'>
                      <li>
                        <strong className='text-gray-800'>ID:</strong>{' '}
                        {selectedItem.id}
                      </li>
                      <li>
                        <strong className='text-gray-800'>Nombre:</strong>{' '}
                        {selectedItem.name}
                      </li>
                      <li>
                        <strong className='text-gray-800'>Creado en:</strong>{' '}
                        {new Date(selectedItem.created_at).toLocaleString()}
                      </li>
                      <li>
                        <strong className='text-gray-800'>
                          Actualizado en:
                        </strong>{' '}
                        {new Date(selectedItem.updated_at).toLocaleString()}
                      </li>
                    </ul>
                  </div>

                  {/* Garment Variant */}
                  <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      Detalles de la Variante
                    </h3>
                    <ul className='space-y-2 text-gray-600 text-lg'>
                      <li>
                        <strong className='text-gray-800'>ID:</strong>{' '}
                        {selectedItem.garment_variant.id}
                      </li>
                      <li>
                        <strong className='text-gray-800'>
                          Path del molde:
                        </strong>{' '}
                        {selectedItem.garment_variant.mold_path ||
                          'No disponible'}
                      </li>
                      <li>
                        <strong className='text-gray-800'>Path técnico:</strong>{' '}
                        {selectedItem.garment_variant.technical_draw_path ||
                          'No disponible'}
                      </li>
                      <li>
                        <strong className='text-gray-800'>
                          ¿Tiene cremallera?
                        </strong>{' '}
                        {selectedItem.garment_variant.has_zipper ? 'Sí' : 'No'}
                      </li>
                      <li>
                        <strong className='text-gray-800'>
                          Foto comercial:
                        </strong>
                        <div className='w-32 h-32 mt-2 overflow-hidden rounded-lg shadow-lg'>
                          <img
                            src={
                               getImage(selectedItem.garment_variant.commercial_photo_path)
                            }
                            alt='Comercial'
                            className='w-full h-full object-cover'
                          />
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Línea de Suministro */}
                  <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      Línea de Suministro
                    </h3>
                    <p className='text-lg text-gray-600'>
                      <strong className='text-gray-800'>Nombre:</strong>{' '}
                      {selectedItem.garment_variant.supply_line.name}
                    </p>
                  </div>

                  {/* Base de Patrón */}
                  <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      Base de Patrón
                    </h3>
                    <ul className='space-y-2 text-gray-600 text-lg'>
                      <li>
                        <strong className='text-gray-800'>Nombre:</strong>{' '}
                        {selectedItem.garment_variant.pattern_base.name}
                      </li>
                      <li>
                        <strong className='text-gray-800'>Descripción:</strong>{' '}
                        {selectedItem.garment_variant.pattern_base.description}
                      </li>
                      <li>
                        <strong className='text-gray-800'>Categoría:</strong>{' '}
                        {
                          selectedItem.garment_variant.pattern_base
                            .category_bases.name
                        }
                      </li>
                      <li>
                        <strong className='text-gray-800'>Género:</strong>{' '}
                        {
                          selectedItem.garment_variant.pattern_base.gender_types
                            .name
                        }
                      </li>
                    </ul>
                  </div>

                  {/* Conjunto de Pantalones */}
                  <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      Conjunto de Pantalones
                    </h3>
                    <ul className='space-y-2 text-gray-600 text-lg'>
                      {selectedItem.pant_set.length > 0 ? (
                        selectedItem.pant_set.map((pant, index) => (
                          <li key={index}>
                            <strong className='text-gray-800'>
                              Pantalón {index + 1}:
                            </strong>{' '}
                            {pant.name || 'Sin nombre'}
                          </li>
                        ))
                      ) : (
                        <li>No hay conjuntos de pantalones disponibles.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetListPage;
