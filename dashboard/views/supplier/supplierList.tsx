'use client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/datatable';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/datatable/data-table-row-actions';
import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { SupplierCreate } from '../types/supplier';
import { listSupplier } from './services/crudSupplier';

const SupplierList = () => {
  const [data, setData] = useState<SupplierCreate[] | []>([]);
  const [loading, setLoading] = useState(false);

  //Supplier
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierCreate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await listSupplier();
    setData(_data);
  };

  const onViewData = (row: SupplierCreate) => {
    setIsModalOpen(true);
    setSelectedSupplier(row);
  };

  const columnsdt: ColumnDef<SupplierCreate>[] = [
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
      accessorKey: 'document_number',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='NIT/Documento' />
      ),
      cell: ({ row }) => <div>{row.getValue('document_number')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'country',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='País' />
      ),
      cell: ({ row }) => <div>{row.getValue('country')}</div>,
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          onPressView={() => onViewData(row.original)}
          row={row}
        />
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
          className='overflow-y-auto max-h-screen p-0'
          size='4xl'
          onClose={() => setIsModalOpen(!open)}
        >
          <div className='w-full max-h-[350px] overflow-scroll p-4'>
            {selectedSupplier && (
              <div className='w-full'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
                  {selectedSupplier.name}
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div className='border p-4 rounded-md shadow-md'>
                    <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                      Información General
                    </h3>
                    <p>
                      <strong>Tipo de Persona:</strong>{' '}
                      {selectedSupplier.person_type_id}
                    </p>
                    <p>
                      <strong>NIT/Documento:</strong>{' '}
                      {selectedSupplier.document_type_id} {selectedSupplier.document_number}
                    </p>
                    <p>
                      <strong>País:</strong> {selectedSupplier.country}
                    </p>
                    <p>
                      <strong>Departamento:</strong> {selectedSupplier.department}
                    </p>
                    <p>
                      <strong>Ciudad:</strong> {selectedSupplier.city}
                    </p>
                    <p>
                      <strong>Barrio:</strong> {selectedSupplier.neighborhood}
                    </p>
                    <p>
                      <strong>Código Postal:</strong> {selectedSupplier.postal_code}
                    </p>
                    <p>
                      <strong>Dirección Completa:</strong>{' '}
                      {selectedSupplier.full_address}
                    </p>
                  </div>

                  <div className='border p-4 rounded-md shadow-md'>
                    <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                      Detalles Fiscales
                    </h3>
                    <p>
                      <strong>Régimen Simple:</strong>{' '}
                      {selectedSupplier.registered_simple_tax_regime ? 'Sí' : 'No'}
                    </p>
                    <p>
                      <strong>Gran Contribuyente:</strong>{' '}
                      {selectedSupplier.big_contributor ? 'Sí' : 'No'}
                    </p>
                    <p>
                      <strong>Responsable de IVA:</strong>{' '}
                      {selectedSupplier.vat_responsible ? 'Sí' : 'No'}
                    </p>
                    <p>
                      <strong>Reteiva No Registrado:</strong>{' '}
                      {selectedSupplier.reteiva_not_registered_simple_regimen
                        ? 'Sí'
                        : 'No'}
                    </p>
                    <p>
                      <strong>Reteiva Registrado:</strong>{' '}
                      {selectedSupplier.reteiva_registered_simple_regimen ? 'Sí' : 'No'}
                    </p>
                    <p>
                      <strong>Causa Retefuente para Impuesto de Renta:</strong>{' '}
                      {selectedSupplier.cause_retefuente_for_income_tax ? 'Sí' : 'No'}
                    </p>
                    <p>
                      <strong>Causa Retefuente para ICA:</strong>{' '}
                      {selectedSupplier.cause_retefuente_for_ica ? 'Sí' : 'No'}
                    </p>
                    <p>
                      <strong>Régimen Fiscal:</strong> {selectedSupplier.tax_regime}
                    </p>
                  </div>
                </div>

                <div className='border p-4 rounded-md shadow-md mb-4'>
                  <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                    Información Bancaria
                  </h3>
                  <p>
                    <strong>Tipo de Cuenta:</strong> {selectedSupplier.type_account}
                  </p>
                  <p>
                    <strong>Número de Cuenta:</strong> {selectedSupplier.account_number}
                  </p>
                  <p>
                    <strong>Banco:</strong> {selectedSupplier.bank}
                  </p>
                  <p>
                    <strong>Opción de Pago:</strong> {selectedSupplier.payment_option}
                  </p>
                  <p>
                    <strong>Plazo de Facturación:</strong>{' '}
                    {selectedSupplier.invoice_deadline}
                  </p>
                </div>

                <div className='border p-4 rounded-md shadow-md mb-4'>
                  <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                    Redes Sociales
                  </h3>
                  {selectedSupplier.url_website && (
                    <p>
                      <strong>Sitio Web:</strong>{' '}
                      <a
                        href={selectedSupplier.url_website}
                        className='text-blue-500 hover:underline'
                      >
                        {selectedSupplier.url_website}
                      </a>
                    </p>
                  )}
                  {selectedSupplier.url_facebook && (
                    <p>
                      <strong>Facebook:</strong>{' '}
                      <a
                        href={selectedSupplier.url_facebook}
                        className='text-blue-500 hover:underline'
                      >
                        {selectedSupplier.url_facebook}
                      </a>
                    </p>
                  )}
                  {selectedSupplier.url_twitter && (
                    <p>
                      <strong>Twitter:</strong>{' '}
                      <a
                        href={selectedSupplier.url_twitter}
                        className='text-blue-500 hover:underline'
                      >
                        {selectedSupplier.url_twitter}
                      </a>
                    </p>
                  )}
                </div>

                <div className='border p-4 rounded-md shadow-md mb-4'>
                  <h3 className='font-semibold text-lg text-gray-700 mb-2'>
                    Contacto
                  </h3>
                  {selectedSupplier.contact_info.map((contact, index) => (
                    <div key={index} className='mb-2'>
                      <p>
                        <strong>Nombre:</strong> {contact.name}
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
                        <strong>Cargo:</strong> {contact.job_title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupplierList;
