"use client";
import { useEffect, useRef, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Select, { MultiValue } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { arrayToReactSelect } from "@/util/arrayToSelect";
import { Master } from "../types/master";
import {
  listColorCloth,
  listInventoryStorage,
  listLine,
  listPresentation,
  listSupplierByTypeService,
  listTypeSupplyByType,
  listUnitMeasures,
} from "../services/master";
import { listCategory } from "../master/services";
import { cn } from "@/lib/utils";
import { schemaCloth } from "./schema/supplyCreate";
import { CleaveInput } from "@/components/ui/cleave";
import { createSupply } from "./services/crudSupply";
import { mapFormToSupplyCreate } from "../types/supply";
import { toast } from "@/components/ui/use-toast";
import { convertFileToBase64 } from "@/util/file";

const CreateClothPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inventories, setInventories] = useState<Record<string, any>[]>([]);

  const [supplyStorage, setSupplyStorage] = useState<Master[]>([]);
  const [supplyPresentation, setSupplyPresentation] = useState<Master[]>([]);
  const [supplyLine, setSupplyLine] = useState<Master[]>([]);
  const [supplyUnitMeasure, setSupplyUnitMeasure] = useState<Master[]>([]);
  const [supplyTypes, setSupplyTypes] = useState<Master[]>([]);
  const [suppliers, setSuppliers] = useState<Master[]>([]);
  const [supplyCategories, setSupplyCategories] = useState<Master[]>([]);
  const [supplyColors, setSupplyColors] = useState<Record<string, any>[]>([]);

  const selectInputRef: any = useRef();

  const form = useForm({
    resolver: zodResolver(schemaCloth),
    mode: "all",
    defaultValues: {
      quantity_by_presentation: 0,
      supply_type_id: null,
      supply_category_id: null,
      supply_subcategory_id: null,
      supply_presentation_id: null,
      supply_line_id: null,
      supply_unit_of_measure_id: null,
      supplier_id: null,
      iva: 0,
      supply_inventory_storage_id: null,
      observation: "",
      base64: null,
      heigth: 0,
      width: 0,
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
        line,
        unit,
        presentation,
        storage,
      ] = await Promise.all([
        listSupplierByTypeService("telas"),
        listTypeSupplyByType("1"),
        listCategory("CLOTH"),
        listLine(),
        listUnitMeasures(),
        listPresentation(),
        listInventoryStorage(),
      ]);

      setSuppliers(supplier);
      setSupplyTypes(typeSupply);
      setSupplyCategories(category);
      setSupplyLine(line);
      setSupplyUnitMeasure(unit);
      setSupplyPresentation(presentation);
      setSupplyStorage(storage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const file =
      data.base64 && data.base64[0]
        ? await convertFileToBase64(data.base64[0])
        : "";
    const response: any = await createSupply(
      mapFormToSupplyCreate({
        ...data,
        base64: file,
        inventories: inventories.map((e) => ({
          ...e,
        })),
      })
    );
    setLoading(false);
    if (response?.status) {
      selectInputRef?.current?.clearValue();
      reset();
      setInventories([]);
      setSupplyColors([]);
      toast({
        title: "Se registro la tela correctamente",
        color: "success",
      });
    } else {
      toast({
        title:
          "No fue posible guardar el registro, por favor valida los datos ingresados o intenta de nuevo",
        color: "destructive",
      });
    }
  };

  const filterColor = async () => {
    const result: Record<string, any> = await listColorCloth({
      suppliers_id: (getValues("supplier_id") as any)?.value,
      supply_categories_id: (getValues("supply_category_id") as any)?.value,
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
            cloth_color_supplier_id: newItem.idcolor,
            supply_color_id: newItem.value,
            supply_color_supplier_id: null,
            supply_code: "",
            quantity: 0,
            real_price: 0,
            commercial_price: 0,
          });
        }
      });

      return updatedInventories;
    });
  };

  const updateInventoryValue = (key: string, value: any, index: number) => {
    setInventories((prev) => {
      prev[index][key] = value;
      return prev;
    });
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administrativo</BreadcrumbItem>
        <BreadcrumbItem>Telas</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Nueva Tela</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Nueva</CardTitle>
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
                              onChange={onChange}
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
                    {errors.supply_category_id && (
                      <div className=" text-destructive mt-2">
                        {errors.supply_category_id.message}
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

                  <div className="flex flex-col gap-2 space-y-2">
                    <FormLabel htmlFor="name">
                      Cantidad por presentación
                    </FormLabel>
                    <Input
                      type="number"
                      id="quantity_by_presentation"
                      {...register("quantity_by_presentation")}
                      className={cn("", {
                        "text-destructive":
                          form.formState.errors.quantity_by_presentation,
                      })}
                    />
                    {errors.quantity_by_presentation && (
                      <div className=" text-destructive mt-2">
                        {errors.quantity_by_presentation.message}
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
                    <FormLabel htmlFor="name">Ancho (MTS)</FormLabel>
                    <Input
                      type="number"
                      id="width"
                      {...register("width")}
                      className={cn("", {
                        "text-destructive": form.formState.errors.width,
                      })}
                    />
                    {errors.width && (
                      <div className=" text-destructive mt-2">
                        {errors.width.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 space-y-2">
                    <FormLabel htmlFor="name">Alto (MTS)</FormLabel>
                    <Input
                      type="number"
                      id="heigth"
                      {...register("heigth")}
                      className={cn("", {
                        "text-destructive": form.formState.errors.heigth,
                      })}
                    />
                    {errors.heigth && (
                      <div className=" text-destructive mt-2">
                        {errors.heigth.message}
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
                    {errors.base64 && (
                      <div className=" text-destructive mt-2">
                        {errors.base64.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <FormLabel htmlFor="name">Descripción</FormLabel>
                  <Textarea id="observation" {...register("observation")} />
                  {errors.observation && (
                    <div className=" text-destructive mt-2">
                      {errors.observation.message}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-5">
                  <div className="flex flex-col gap-2 mt-5">
                    <FormLabel htmlFor="name">Colores</FormLabel>
                    <Select
                      ref={selectInputRef}
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
                            Valor unitario real
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Valor unitario comercial
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventories && inventories?.length ? (
                          inventories?.map((e, i) => (
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {e.color_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Input
                                  type="text"
                                  id="supply_code"
                                  onChange={(e) =>
                                    updateInventoryValue(
                                      "supply_code",
                                      e.target.value,
                                      i
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Input
                                  type="number"
                                  id="quantity"
                                  onChange={(e) =>
                                    updateInventoryValue(
                                      "quantity",
                                      e.target.value,
                                      i
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <CleaveInput
                                  id="real_price"
                                  options={{ numeral: true }}
                                  placeholder="10,000"
                                  onChange={(e: any) =>
                                    updateInventoryValue(
                                      "real_price",
                                      e.target.rawValue,
                                      i
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <CleaveInput
                                  id="commercial_price"
                                  options={{ numeral: true }}
                                  placeholder="10,000"
                                  onChange={(e: any) =>
                                    updateInventoryValue(
                                      "commercial_price",
                                      e.target.rawValue,
                                      i
                                    )
                                  }
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
                  <Button
                    className="float-right"
                    type="submit"
                    disabled={loading}
                  >
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

export default CreateClothPage;
