import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
  User,
  UserPlus,
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
        title: "Dashboard",
        icon: DashBoard,
        child: [
          {
            title: "Ventas",
            href: "/dashboard",
            icon: Graph,
          },
          {
            title: "Compras",
            href: "/ecommerce",
            icon: Cart,
          },
          {
            title: "Producción ",
            href: "/project",
            icon: ClipBoard,
          },
        ],
      },
      {
        title: "Proveedores",
        icon: ListFill,
        child: [
          {
            title: "Nuevo proveedor",
            icon: Components,
            href: "/supplier/create",
          },
          {
            title: "Listar proveedores",
            icon: Envelope,
            href: "/supplier/list",
          },
        ],
      },
      {
        title: "Clientes",
        icon: User,
        child: [
          {
            title: "Crear cliente",
            icon: UserPlus,
            href: "/client/create",
          },
          {
            title: "Listar clientes",
            icon: ListFill,
            href: "/client/list",
          },
        ],
      },
      {
        title: "Insumos",
        icon: Grid,
        child: [
          {
            title: "Insumos",
            icon: ListFill,
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
            icon: ListFill,
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
        title: "Maestros",
        icon: Stacks2,
        child: [
          {
            title: "Insumos",
            icon: Stacks2,
            nested: [
              {
                title: "Tipo de insumos",
                href: "/master/material/type",
              },
              {
                title: "Categoria de insumos",
                href: "/master/material/category",
              },
              {
                title: "Sub categorias de insumos",
                href: "/master/material/subcategory",
              },
            ],
          },
          {
            title: "Telas",
            icon: Stacks2,
            nested: [
              {
                title: "Tejido",
                href: "/master/cloths/type",
              },
              {
                title: "Tipo de telas",
                href: "/master/cloths/category",
              },
            ],
          },
          {
            title: "Colores",
            icon: Stacks2,
            href: "/master/general/color",
          },
          {
            title: "Presentaciones",
            icon: Stacks2,
            href: "/master/general/presentation",
          },

          {
            title: "Linea",
            icon: Stacks2,
            href: "/master/general/linea",
          },

          {
            title: "Unidad de medida",
            icon: Stacks2,
            href: "/master/general/unit",
          },
        ],
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
