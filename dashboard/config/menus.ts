import {
  Uno,
  Dos,
  Tres,
  Cuatro,
  Cinco,
  Seis,
  Siete,
  Ocho,
  Nueve,
  Diez,
  Once,
  Doce,
  ListFill,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  sidebarNav: {
    modern: [
      {
        title: "Informes",
        icon: Uno,
        child: [
          // {
          //   title: "Ventas",
          //   href: "/project",
          //   icon: Uno,
          // },
          // {
          //   title: "Compras",
          //   href: "/project",
          //   icon: Uno,
          // },
          // {
          //   title: "Producción ",
          //   href: "/project",
          //   icon: Uno,
          // },
        ],
      },
      {
        title: "Administrativo",
        icon: Dos,
        child: [
          {
            title: "Maestros",
            icon: Dos,
            nested: [
              {
                title: "Tipo de insumos",
                icon: Dos,
                href: "/master/general/type",
              },
              {
                title: "Colores",
                icon: Dos,
                href: "/master/general/color",
              },
              {
                title: "Linea",
                icon: Dos,
                href: "/master/general/linea",
              },

              {
                title: "Categoria de insumos",
                href: "/master/material/category",
              },
              {
                title: "Sub categorias de insumos",
                href: "/master/material/subcategory",
              },
              {
                title: "Colores de insumos Proveedor",
                href: "/master/material/colorxsupplier",
              },

              {
                title: "Categorias de telas",
                href: "/master/cloths/category",
              },
              {
                title: "Colores de telas Proveedor",
                href: "/master/cloths/colorxsupplier",
              },
            ],
          },
          {
            title: "Insumos",
            icon: Dos,
            nested: [
              {
                title: "Crear insumos",
                href: "/material/create",
              },
              {
                title: "Listar insumos",
                href: "/material/list",
              },
            ],
          },
          {
            title: "Telas",
            icon: Dos,
            nested: [
              {
                title: "Crear nueva tela",
                href: "/cloth/create",
              },
              {
                title: "Listar telas",
                href: "/cloth/create",
              },
            ],
          },
        ],
      },
      {
        title: "Calidad",
        icon: Tres,
        child: [],
      },
      {
        title: "Financiero",
        icon: Cuatro,
        child: [],
      },
      {
        title: "Compras",
        icon: Cinco,
        child: [
          {
            title: "Proveedor",
            icon: Dos,
            nested: [
              {
                title: "Nuevo proveedor",
                // icon: Components,
                href: "/supplier/create",
              },
              {
                title: "Listar proveedores",
                // icon: Envelope,
                href: "/supplier/list",
              },
            ],
          },
          {
            title: "Órden de compra",
            icon: ListFill,
            nested: [
              {
                title: "Crear",
          
                href: "/purchase/purchase-order",
              },
              {
                title: "Pendientes",             
                href: "/purchase/purchase-list",
              },
              {
                title: "Aprobadas",             
                href: "/purchase/purchase-approved",
              },{
                title: "Todas",             
                href: "/purchase/purchase-all",
              },
            ],
          },
        ],
      },
      {
        title: "Diseño",
        icon: Seis,
        child: [],
      },
      {
        title: "Producción",
        icon: Siete,
        child: [],
      },
      {
        title: "Comercial",
        icon: Ocho,
        child: [
          {
            title: "Cliente",
            icon: Dos,
            nested: [
              {
                title: "Crear cliente",
                href: "/client/create",
              },
              {
                title: "Listar clientes",
                href: "/client/list",
              },
            ],
          },
        ],
      },
      {
        title: "Logistica",
        icon: Nueve,
        child: [],
      },
      {
        title: "S.S.T Y R.H",
        icon: Diez,
        child: [],
      },
      {
        title: "Tecnología",
        icon: Once,
        child: [],
      },
      {
        title: "I+I+D",
        icon: Doce,
        child: [],
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
