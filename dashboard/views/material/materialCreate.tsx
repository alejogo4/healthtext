"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";

export const colors: { value: string; label: string }[] = [
  { value: "BLANCO", label: "BLANCO" },
  { value: "NEGRO", label: "NEGRO" },
  { value: "AZUL OSCURO - UPB", label: "AZUL OSCURO - UPB" },
  { value: "P7", label: "P7" },
  { value: "P4", label: "P4" },
];

const BlankPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Insumos</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Nuevo Insumo</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Nuevo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Proveedor</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione un proveedor"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Tipo</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione un tipo"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Categoria</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione una categoria"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Subcategoria</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione una subcategoria"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Presentación</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione una presentación"
                />
              </div>

              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Linea</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione una linea"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <Label htmlFor="name">Unidad de medida</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccione una linea"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Descripción</Label>
                <Input type="file" id="name" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <Label htmlFor="name">Descripción</Label>
              <Textarea id="name" />
            </div>
            <div className=" flex flex-col gap-2 mt-5">
              <Label htmlFor="name">Colores</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                placeholder="Seleccione un color"
                isMulti
                options={colors}
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button className="float-right" type="submit">
                Guardar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlankPage;
