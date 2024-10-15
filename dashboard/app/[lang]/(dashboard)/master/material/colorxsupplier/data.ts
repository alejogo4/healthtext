import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Timer,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "active",
    label: "Active",
    icon: CheckCircle2,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ChevronDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ChevronRight,
  },
  {
    label: "High",
    value: "high",
    icon: ChevronUp,
  },
];

export const suppliers: { value: string; label: string }[] = [
  { value: "SESGOCOLOR", label: "SESGOCOLOR" },
  { value: "COATS", label: "COATS" },
  { value: "BOMBAY", label: "BOMBAY" },
];

export const material: { value: string; label: string }[] = [
  { value: "SESGOS", label: "SESGOS" },
  { value: "HILOS", label: "HILOS" },
  { value: "BOTONES", label: "BOTONES" },
];

export const colors: { value: string; label: string }[] = [
  { value: "BLANCO", label: "BLANCO" },
  { value: "NEGRO", label: "NEGRO" },
  { value: "AZUL OSCURO - UPB", label: "BOTONES" },
];

export const data = [
  {
    id: "1",
    description: "P2",
    status: "active",
    color: "BLANCO",
    supplier: "ENVIVAR PRENDA",
    material_type: "SESGOS",
  },
  {
    id: "1",
    description: "P7",
    status: "active",
    color: "NEGRO",
    supplier: "ENVIVAR PRENDA",
    material_type: "SESGOS",
  },
  {
    id: "1",
    description: "P4",
    status: "active",
    color: "AZUL OSCURO - UPB",
    supplier: "ENVIVAR PRENDA",
    material_type: "SESGOS",
  },
];
