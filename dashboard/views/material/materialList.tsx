"use client";
import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { ReactDataTableStatic } from "@/components/ui/react-data-table-static";
import { Supply, Inventory } from "../types/supply";
import { listSupply } from "./services/crudSupply";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertTextToMoney } from "@/util/money";
import { SiteLogo } from "@/components/svg";

const MaterialListPage = () => {
  const [data, setData] = useState<Supply[] | []>([]);
  const [dataDetail, setDataDetail] = useState<Supply | null>();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      name: "",
      cell: (row: Supply) =>
        row.path_photo ? (
          <img src={row.path_photo} className="h-7 w-7" />
        ) : (
          <SiteLogo className="h-7 w-7" />
        ),
      width: "70px",
    },
    {
      name: "Proveedor",
      selector: (row: Supply) => row.supplier.name,
      sortable: true,
      filterKey: "supplier.name",
    },
    {
      name: "Tipo",
      selector: (row: Supply) => row.supply_type.name,
      sortable: true,
      filterKey: "supply_type.name",
    },
    {
      name: "Categoria",
      selector: (row: Supply) => row.supply_category.name,
      sortable: true,
      filterKey: 'supply_category.name'
    },
    {
      name: "Subcategoria",
      selector: (row: Supply) => row.supply_subcategory?.name ?? "",
      sortable: true,
      filterKey: 'supply_subcategory.name'
    },
    {
      name: "Presentación",
      selector: (row: Supply) => row.supply_presentation.name,
      sortable: true,
      filterKey: 'supply_presentation.name'
    },
    {
      name: "Cantidad X Presentación",
      selector: (row: Supply) => row.quantity_by_presentation,
      sortable: true,
      filterKey: 'quantity_by_presentation'
    },
    {
      name: "Unidad de medida",
      selector: (row: Supply) => row.supply_unit_of_measure.name,
      sortable: true,
      filterKey: 'supply_unit_of_measure.name'
    },
    {
      name: "Linea",
      selector: (row: Supply) => row.supply_line.name,
      sortable: true,
      filterKey: 'supply_line.name'
    },
    {
      name: "Iva",
      cell: (row: Supply) => `${row.iva ?? 0}%`,
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

  const onopenInventoryModal = (item: Supply) => {
    setDataDetail(item);
    setIsModalOpen(true);
  };

  const onEdit = (item: Supply) => {};

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administrativo</BreadcrumbItem>
        <BreadcrumbItem>Insumos</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Listar Insumos</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5">
        <ReactDataTableStatic
          columns={columns}
          data={data}
          progressPending={loading}
          expandableRows={true}
          expandableRowsComponent={(row:any) => (
            <div className="p-6 flex flex-col">
              <b >Descripción</b>
              <p>{row.observation ?? 'N/A'}</p>
            </div>
          )}
        />
      </div>

      <Dialog open={isModalOpen}>
        <DialogContent
          className="overflow-y-auto max-h-screen p-0"
          size="4xl"
          onClose={() => setIsModalOpen(!open)}
        >
          <div className="w-full p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código del proveedor</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Precio real</TableHead>
                  <TableHead>Precio comercial</TableHead>
                  <TableHead>Bodega</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataDetail?.inventories.map((item: Inventory) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      {item.supply_code}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.supply_color_supplier
                        ? `${item.supply_color_supplier?.code ?? ""} ${
                            item.supply_color_supplier?.name ?? ""
                          }`
                        : null}{" "}
                      {item.supply_color.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {convertTextToMoney(item.real_price.toString())}
                    </TableCell>
                    <TableCell className="text-center">
                      {convertTextToMoney(item.commercial_price.toString())}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.supply_inventory_storage.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaterialListPage;
