'use client';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CategoryBase } from '../../services/categoriesBase';
import {
  deleteBaseCategory,
  listBaseCategory
} from '../../services/crudCategoriesBase';
import toast from 'react-hot-toast';
import EditCategoryBase from '../editCategoryBase/editCategoryBase';
import { getImage } from '@/util/file';

export type Props = {
  categoriesBase: CategoryBase[] | [];
};

const CategoryBaseList = ({ categoriesBase }: Props) => {
  const [data, setData] = useState<CategoryBase[] | []>(categoriesBase);
  const [loading, setLoading] = useState(false);

  //Supplier
  const [selectedCategorie, setSelectedCategorie] =
    useState<CategoryBase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, []);

  const onViewData = (row: CategoryBase) => {
    setIsModalOpen(true);
    setSelectedCategorie(row);
  };

  const onDeleteItem = async (id: string) => {
    let response = await deleteBaseCategory(id);
    if (response?.status) {
      getData();
      toast.success(response?.message);
    }
  };

  const getData = async () => {
    const _data = await listBaseCategory();
    setData(_data);
  };

  const columnsdt: ColumnDef<CategoryBase>[] = [
    {
      accessorKey: 'packing_photo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Foto' />
      ),
      cell: ({ row }) => {
        const image = row.getValue('packing_photo') as string;
        return image ? (
          <img
            src={getImage(image)} 
            alt='Foto de empaque'
            style={{ width: '50px', height: 'auto' }}
          />
        ) : (
          <span>Sin imagen</span>
        );
      },
      enableSorting: false,
      enableHiding: false
    },
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
      accessorKey: 'packing_instructions',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='Instrucciones de embalaje'
        />
      ),
      cell: ({ row }) => <div>{row.getValue('packing_instructions')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Código' />
      ),
      cell: ({ row }) => <div>{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          onPressView={() => onViewData(row.original)}
          onPressDelete={id => onDeleteItem(id)}
          onPressEdit={() => onViewData(row.original)}
          id={row.original.id}
          row={row}
        />
      )
    }
  ];

  return (
    <>
      <Card className='py-4 px-2'>
        <DataTable data={data} columns={columnsdt} />
      </Card>
      <Dialog open={isModalOpen}>
        <DialogContent
          className='overflow-y-auto max-h-screen p-0'
          size='4xl'
          onClose={() => setIsModalOpen(!open)}
        >
          <div className='w-full max-h-[350px] overflow-scroll p-4'>
            {selectedCategorie && (
              <div className='w-full'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
                  {selectedCategorie.name}
                </h2>

                <div className=''>
                  {selectedCategorie && (
                    <EditCategoryBase categoriesBase={selectedCategorie} />
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryBaseList;
