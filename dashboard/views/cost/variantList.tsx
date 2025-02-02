'use client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  getDetailVariant,
  listVariant,
  PatternBase,
  SupplyLine,
  VariantResponse
} from './services/crudVariants';
import { ItemVariantDetail } from '@/views/types/variants';
import {
  DropdownMenuItem,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu';

const VariantList = () => {
  const [data, setData] = useState<VariantResponse[] | []>([]);
  const [loading, setLoading] = useState(false);

  //Supplier
  const [selectedItem, setSelectedItem] = useState<ItemVariantDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await listVariant();
    setLoading(false);
    setData(_data);
  };

  const onViewData = async (row: VariantResponse) => {
    setIsModalOpen(true);
    const data = await getDetailVariant(row.id);
    if (data) {
      setSelectedItem(data);
    }
  };

  const columnsdt: ColumnDef<VariantResponse>[] = [
    {
      accessorKey: 'pattern_base',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Base' />
      ),
      cell: ({ row }) => (
        <div>{(row.getValue('pattern_base') as PatternBase)?.name ?? ''}</div>
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'pattern_base',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Categoría base' />
      ),
      cell: ({ row }) => (
        <div>
          {(row.getValue('pattern_base') as PatternBase)?.category_bases.name ??
            ''}
        </div>
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'supply_line',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Línea' />
      ),
      cell: ({ row }) => (
        <div>{(row.getValue('supply_line') as SupplyLine)?.name ?? ''}</div>
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <>
          <DataTableRowActions
            onPressView={() => onViewData(row.original)}
            id={row.original.id.toString()}
            row={row}
            
          />
        </>
      )
    }
  ];

  return (
    <>
      <Card className='py-4 px-2'>
        {data.length > 0 && <DataTable data={data} columns={columnsdt} />}
      </Card>
      <Dialog open={isModalOpen}>
        <DialogContent
          className='overflow-y-auto max-h-screen h-[80vh] p-0'
          size='5xl'
          onClose={() => setIsModalOpen(!open)}
        >
          <div className='w-full max-h-[100%] overflow-scroll p-4'>
            {selectedItem && (
              <div className='w-full'>
                <div className='space-y-8'>
                  {/* Supply Line Section */}
                  <section>
                    <h3 className='text-xl font-semibold text-blue-600 flex items-center'>
                      <span className='mr-2'>📦</span> Línea de producción
                    </h3>
                    <div className='mt-2 pl-4 border-l-4 border-blue-200'>
                      <p className='text-gray-700'>
                        <strong>Nombre:</strong> {selectedItem.supply_line.name}
                      </p>
                    </div>
                  </section>

                  {/* Pattern Base Section */}
                  <section>
                    <h3 className='text-xl font-semibold text-green-600 flex items-center'>
                      <span className='mr-2'>🖋️</span> Base
                    </h3>
                    <div className='mt-2 pl-4 border-l-4 border-green-200'>
                      <p className='text-gray-700'>
                        <strong>Nombre:</strong>{' '}
                        {selectedItem.pattern_base.name}
                      </p>
                      <p className='text-gray-700'>
                        <strong>Categoría base:</strong>{' '}
                        {selectedItem.pattern_base.category_bases.name}
                      </p>
                      <p className='text-gray-700'>
                        <strong>Descripción:</strong>{' '}
                        {selectedItem.pattern_base.description}
                      </p>
                    </div>
                  </section>

                  {/* Silhouettes Section */}
                  <section>
                    <h3 className='text-xl font-semibold text-purple-600 flex items-center'>
                      <span className='mr-2'>👗</span> Siluetas
                    </h3>
                    <ul className='mt-2 pl-4 border-l-4 border-purple-200 space-y-2'>
                      {selectedItem.silhouettes.map(silhouette => (
                        <li
                          key={silhouette.id}
                          className='flex items-center text-gray-700'
                        >
                          {silhouette.silhouettes.name}{' '}
                          <span className='ml-2 text-sm italic text-gray-500'>
                            (Tiene cremallera:{' '}
                            {silhouette.has_zipper ? 'Sí' : 'No'})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Sizes Section */}
                  <section>
                    <h3 className='text-xl font-semibold text-orange-600 flex items-center'>
                      <span className='mr-2'>📏</span> Tallas
                    </h3>
                    <ul className='mt-2 pl-4 border-l-4 border-orange-200 space-y-2'>
                      {selectedItem.sizes.map(size => (
                        <li
                          key={size.id}
                          className='flex items-center text-gray-700'
                        >
                          {size.sizes.name}{' '}
                          <span className='ml-2 text-sm italic text-gray-500'>
                            (Grupo: {size.sizes.group})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Embroideries Section */}
                  <section>
                    <h3 className='text-xl font-semibold text-teal-600 flex items-center'>
                      <span className='mr-2'>🪡</span> Bordados
                    </h3>
                    <ul className='mt-2 pl-4 border-l-4 border-teal-200 space-y-2'>
                      {selectedItem.embroideries.map(embroidery => (
                        <li
                          key={embroidery.id}
                          className='flex items-center text-gray-700'
                        >
                          {embroidery.embroidery.name}{' '}
                          <span className='ml-2 text-sm italic text-gray-500'>
                            ({embroidery.description || 'Sin descripción'})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VariantList;
