
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
  { value: "LAFAYETTE", label: "LAFAYETTE" },
  { value: "SPIRIT", label: "SPIRIT" },
];

export const material: { value: string; label: string }[] = [
  { value: "Clororesistente", label: "Clororesistente" },
  { value: "T180", label: "T180" },
  { value: "Lotus", label: "Lotus" },
];

export const colors: { value: string; label: string }[] = [
  { value: "BLANCO", label: "BLANCO" },
  { value: "NEGRO", label: "NEGRO" },
  { value: "AZUL OSCURO - UPB", label: "BOTONES" },
];

export const data = [
  {
    id: "1",
    description: "10",
    status: "active",
    color: "BLANCO",
    supplier: "LAFAYETTE",
    material_type: "Clororesistente",
  },
  {
    id: "1",
    description: "110601",
    status: "active",
    color: "NEGRO",
    supplier: "LAFAYETTE",
    material_type: "Lotus",
  },
  {
    id: "1",
    description: "110601",
    status: "active",
    color: "AZUL OSCURO - UPB",
    supplier: "SPIRIT",
    material_type: "Lotus",
  },
];
