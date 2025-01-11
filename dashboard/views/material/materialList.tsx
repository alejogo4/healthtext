"use client";
import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Supply } from "../types/supply";
import { listSupply } from "./services/crudSupply";
import DataTable from "react-data-table-component";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MaterialListPage = () => {
  const [data, setData] = useState<Supply[] | []>([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Proveedor",
      selector: (row: Supply) => row.supplier.name,
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row: Supply) => row.supply_type.name,
      sortable: true,
    },
    {
      name: "Categoria",
      selector: (row: Supply) => row.supply_category.name,
      sortable: true,
    },
    {
      name: "Subcategoria",
      selector: (row: Supply) => row.supply_subcategory.name,
      sortable: true,
    },
    {
      name: "Presentación",
      selector: (row: Supply) => row.supply_presentation.name,
      sortable: true,
    },
    {
      name: "Unidad de medida",
      selector: (row: Supply) => row.supply_unit_of_measure.name,
      sortable: true,
    },
    {
      name: "",
      cell: (row: Supply) => (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => onopenInventoryModal(row)}>
                Ver Inventario
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(row)}>
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const _data = await listSupply(2);
    setData(_data);
    setLoading(false);
  };

  const onopenInventoryModal = (item: Supply) => {};

  const onEdit = (item: Supply) => {};

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administrativo</BreadcrumbItem>
        <BreadcrumbItem>Insumos</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Listar Insumos</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
        />
      </div>

    </div>
  );
};

export default MaterialListPage;
