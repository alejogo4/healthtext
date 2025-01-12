import React, {
  useState,
  useMemo,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input } from "./input";
import { Icon } from "@iconify/react";
import { ExpandableRowsComponent } from "react-data-table-component/dist/DataTable/types";

const getNestedProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const FilterComponent = ({
  onFilter,
  onClear,
  filterText,
}: {
  onFilter: ChangeEventHandler<HTMLInputElement>;
  onClear: MouseEventHandler<HTMLButtonElement>;
  filterText: any;
}) => (
  <div className="relative">
    <span
      className="text-2xl text-default-400 absolute top-1/2 -translate-y-1/2 right-4 z-10"
      onClick={onClear}
    >
      <Icon icon="system-uicons:close" />
    </span>
    <Input
      type="text"
      placeholder="Buscar"
      value={filterText}
      onChange={onFilter}
    />
  </div>
);

export const ReactDataTableStatic = ({
  data,
  columns,
  progressPending = false,
  expandableRows = false,
  expandableRowsComponent,
}: {
  data: any[];
  columns: (TableColumn<any> & { filterKey?: string })[]; // Adding filterKey
  progressPending?: boolean;
  expandableRows?: boolean;
  expandableRowsComponent?: ExpandableRowsComponent<any>;
}) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter((item) => {
    return columns.some((column) => {
      if (!column.filterKey) return false;
      const value = getNestedProperty(item, column.filterKey);
      return (
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
  });

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      progressPending={progressPending}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
      expandableRows={expandableRows}
      expandableRowsComponent={expandableRowsComponent}
    />
  );
};
