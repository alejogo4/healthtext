"use client";
import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Select, { MultiValue } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { arrayToReactSelect } from "@/util/arrayToSelect";
import { Master } from "../types/master";
import {
  listColorSupplier,
  listInventoryStorage,
  listLine,
  listPresentation,
  listSupplierByTypeService,
  listTypeSupplyByType,
  listUnitMeasures,
} from "../services/master";
import { listCategory, listSubCategory } from "../master/services";
import { cn } from "@/lib/utils";
import { CleaveInput } from "@/components/ui/cleave";

const schema = z.object({
  supply_type_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_category_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_subcategory_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_presentation_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_line_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_unit_of_measure_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supplier_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_inventory_storage_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  base64: z.instanceof(File),
  iva: z.preprocess((value) => Number(value), z.number()),
  description: z.string().optional(),
});

const BlankPage = () => {
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState<Record<string, any>[]>([]);

  const [supplyStorage, setSupplyStorage] = useState<Master[]>([]);
  const [supplyPresentation, setSupplyPresentation] = useState<Master[]>([]);
  const [supplyLine, setSupplyLine] = useState<Master[]>([]);
  const [supplyUnitMeasure, setSupplyUnitMeasure] = useState<Master[]>([]);
  const [supplyTypes, setSupplyTypes] = useState<Master[]>([]);
  const [suppliers, setSuppliers] = useState<Master[]>([]);
  const [supplyCategories, setSupplyCategories] = useState<Master[]>([]);
  const [supplySubCategories, setSupplySubCategories] = useState<Master[]>([]);
  const [supplyColors, setSupplyColors] = useState<Record<string, any>[]>([]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      supply_type_id: null,
      supply_category_id: null,
      supply_subcategory_id: null,
      supply_presentation_id: null,
      supply_line_id: null,
      supply_unit_of_measure_id: null,
      supplier_id: null,
      iva: 0,
      supply_inventory_storage_id: null,
      description: null,
      base64: null
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = form;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        supplier,
        typeSupply,
        category,
        subcategory,
        line,
        unit,
        presentation,
        storage,
      ] = await Promise.all([
        listSupplierByTypeService("insumos"),
        listTypeSupplyByType("2"),
        listCategory("SUPPLY"),
        listSubCategory(),
        listLine(),
        listUnitMeasures(),
        listPresentation(),
        listInventoryStorage(),
      ]);

      setSuppliers(supplier);
      setSupplyTypes(typeSupply);
      setSupplyCategories(category);
      setSupplySubCategories(subcategory), setSupplyLine(line);
      setSupplyUnitMeasure(unit);
      setSupplyPresentation(presentation);
      setSupplyStorage(storage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {};

  const filterColor = async () => {
    const result: Record<string, any> = await listColorSupplier({
      suppliers_id: (getValues("supplier_id") as any)?.value,
      supply_types_id: (getValues("supply_type_id") as any)?.value,
    });
    setSupplyColors(
      result.map((e: Record<string, any>) => ({
        idcolor: e?.idcolor,
        value: e?.id.toString(),
        label: `${e?.name} ${e?.namecolor ? "-" : ""} ${e?.codecolor ?? ""} ${
          e?.namecolor ?? ""
        }`,
      }))
    );
  };

  const colorTable = (newData: MultiValue<Record<string, any>>) => {
    setInventories((prev) => {
      const newSupplyColorIds = new Set(newData.map((item) => item.value));
      const updatedInventories = prev.filter((item) =>
        newSupplyColorIds.has(item.supply_color_id)
      );
      newData.forEach((newItem) => {
        const exists = updatedInventories.some(
          (item) => item.supply_color_id === newItem.value
        );
        if (!exists) {
          updatedInventories.push({
            color_name: newItem.label,
            supply_color_supplier_id: newItem.idcolor,
            supply_color_id: newItem.value,
            supply_code: "",
            quantity: 0,
            unit_value: 0,
            last_price: 0,
          });
        }
      });

      return updatedInventories;
    });
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Insumos</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Nuevo Insumo</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Nuevo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supplier_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supplier_id,
                            })}
                            htmlFor="name"
                          >
                            Proveedor
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(suppliers)}
                              onChange={(e) => {
                                onChange(e);
                                filterColor();
                              }}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supplier_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supplier_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_type_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supply_type_id,
                            })}
                            htmlFor="name"
                          >
                            Tipo
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un tipo"
                              options={arrayToReactSelect(supplyTypes)}
                              onChange={(e) => {
                                onChange(e);
                                filterColor();
                              }}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_type_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_type_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_category_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supply_category_id,
                            })}
                            htmlFor="name"
                          >
                            Categoria
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione una categoria"
                              options={arrayToReactSelect(supplyCategories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_category_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_category_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_subcategory_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supply_subcategory_id,
                            })}
                            htmlFor="name"
                          >
                            Suncategoria
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(supplySubCategories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_subcategory_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_subcategory_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_presentation_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supply_presentation_id,
                            })}
                            htmlFor="name"
                          >
                            Presentación
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(supplyPresentation)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_presentation_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_presentation_id.message}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_line_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supply_line_id,
                            })}
                            htmlFor="name"
                          >
                            Linea
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(supplyLine)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_line_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_line_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_unit_of_measure_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors.supply_unit_of_measure_id,
                            })}
                            htmlFor="name"
                          >
                            Unidad de medida
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(supplyUnitMeasure)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_unit_of_measure_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_unit_of_measure_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_inventory_storage_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn("", {
                              "text-destructive":
                                form.formState.errors
                                  .supply_inventory_storage_id,
                            })}
                            htmlFor="name"
                          >
                            Bodega
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(supplyStorage)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {errors.supply_inventory_storage_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_inventory_storage_id.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 space-y-2">
                    <FormLabel htmlFor="name">Iva</FormLabel>
                    <Input
                      type="number"
                      id="iva"
                      {...register("iva")}
                      className={cn("", {
                        "text-destructive": form.formState.errors.iva,
                      })}
                    />
                    {errors.iva && (
                      <div className=" text-destructive mt-2">
                        {errors.iva.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 space-y-2">
                    <FormLabel htmlFor="name">Foto</FormLabel>
                    <Input type="file" id="name" {...register("base64")} />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <FormLabel htmlFor="name">Descripción</FormLabel>
                  <Textarea id="description" {...register("description")} />
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-5">
                  <div className="flex flex-col gap-2 mt-5">
                    <FormLabel htmlFor="name">Colores</FormLabel>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      placeholder="Seleccione un color"
                      isMulti
                      onChange={colorTable}
                      options={supplyColors}
                    />
                  </div>
                  <div>
                    <table className="min-w-full divide-y divide-gray-200 mt-5">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Color
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Código del proveedor
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Cantidad inicial
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Valor unitario
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventories && inventories?.length ? (
                          inventories?.map((e) => (
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {e.color_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Input type="text" id="iva" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Input type="number" id="iva" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <CleaveInput
                                  id="nu"
                                  options={{ numeral: true }}
                                  placeholder="10,000"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                              colSpan={4}
                            >
                              Seleecione un color para agregar el inventario
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end mt-5">
                  <Button className="float-right" type="submit">
                    Guardar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlankPage;
