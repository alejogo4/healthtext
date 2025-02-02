'use client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import {
  BaseType,
  CategoryBases,
  deleteBase,
  GenderTypes,
  listBaseClient
} from './services/crudBase';

const SetList = () => {
  const [data, setData] = useState<BaseType[] | []>([]);
  const [loading, setLoading] = useState(false);

  //Supplier
  const [selectedItem, setSelectedItem] = useState<BaseType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await listBaseClient();
    setData(_data);
  };

  const onViewData = (row: BaseType) => {
    setIsModalOpen(true);
    setSelectedItem(row);
  };

  const columnsdt: ColumnDef<BaseType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-0.5'
        />
      ),
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
        const gender = (row.getValue('gender_types') as GenderTypes)?.name;
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
        const gender = (row.getValue('category_bases') as CategoryBases)?.name;
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
    let response = await deleteBase(id);
    if (response?.status) {
      getData();
      toast.success(response?.message);
    }
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
          <div className='w-full max-h-[350px] overflow-scroll p-4'>
            {selectedItem && (
              <div className='w-full'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
                  {selectedItem.name}
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  {/* <div className='border p-4 rounded-md shadow-md'>
                    <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                      Información General
                    </h3>
                    <p>
                      <strong>Tipo de Persona:</strong>{' '}
                      {selectedClient.person_type_id}
                    </p>
                    <p>
                      <strong>NIT/Documento:</strong>{' '}
                      {selectedClient.document_type_id}{' '}
                      {selectedClient.document_number}
                    </p>
                    <p>
                      <strong>País:</strong> {selectedClient.country}
                    </p>
                    <p>
                      <strong>Departamento:</strong> {selectedClient.department}
                    </p>
                    <p>
                      <strong>Ciudad:</strong> {selectedClient.city}
                    </p>
                    <p>
                      <strong>Barrio:</strong> {selectedClient.neighborhood}
                    </p>
                    <p>
                      <strong>Código Postal:</strong>{' '}
                      {selectedClient.postal_code}
                    </p>
                    <p>
                      <strong>Dirección Completa:</strong>{' '}
                      {selectedClient.full_address}
                    </p>
                    <p>
                      <strong>Profesión/Especialidad:</strong>{' '}
                      {selectedClient.profession_specialty}
                    </p>
                    <p>
                      <strong>Autoriza recibir información:</strong>{' '}
                      {selectedClient.authorizes_receive_information
                        ? 'Sí'
                        : 'No'}
                    </p>
                    <p>
                      <strong>Lugar de Autorización:</strong>{' '}
                      {selectedClient.where_authorize}
                    </p>
                    <p>
                      <strong>Conocido a través de:</strong>{' '}
                      {selectedClient.way_to_meet_them}
                    </p>
                    <p>
                      <strong>Moneda de Pago:</strong>{' '}
                      {selectedClient.payment_currency}
                    </p>
                    <p>
                      <strong>Fecha de Nacimiento:</strong>{' '}
                      {selectedClient.date_birth}
                    </p>
                    <p>
                      <strong>Correo Electrónico:</strong>{' '}
                      {selectedClient.email}
                    </p>
                    <p>
                      <strong>Celular:</strong> {selectedClient.cellphone}
                    </p>
                  </div> */}

                  {/* <div className='border p-4 rounded-md shadow-md'>
                    <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                      Contacto
                    </h3>
                    {selectedClient.contact_info.map((contact, index) => (
                      <div key={index} className='mb-2'>
                        <p>
                          <strong>Nombre:</strong> {contact.name}
                        </p>
                        <p>
                          <strong>Extensión:</strong> {contact.ext}
                        </p>
                        <p>
                          <strong>Teléfono:</strong> {contact.phone}
                        </p>
                        <p>
                          <strong>Celular:</strong> {contact.cellphone}
                        </p>
                        <p>
                          <strong>Correo:</strong> {contact.mail}
                        </p>
                        <p>
                          <strong>Correo Alternativo:</strong>{' '}
                          {contact.alternate_mail}
                        </p>
                        <p>
                          <strong>Cargo:</strong> {contact.job_title}
                        </p>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetList;
