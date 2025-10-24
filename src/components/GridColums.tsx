// gridColumns.ts
import type { GridColDef } from "@mui/x-data-grid";
import type { ItemList } from "../shared/gridTypes";

// --- Helpers ----------------------------------------------------

const formatCurrency = (value: unknown): string => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "-";
  // use the user's locale; change currency if you need a fixed one
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(n);
};

const formatDate = (value: unknown): string => {
  if (typeof value !== "string" || value.trim() === "") return "-";
  const t = Date.parse(value);
  if (!Number.isFinite(t)) return value; // show raw if unparsable
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(t));
};

const dateSortComparator = (a?: string, b?: string) => {
  const ta = typeof a === "string" ? Date.parse(a) : NaN;
  const tb = typeof b === "string" ? Date.parse(b) : NaN;
  // Unparsable dates sink to bottom
  if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
  if (Number.isNaN(ta)) return 1;
  if (Number.isNaN(tb)) return -1;
  return ta - tb;
};

// --- Columns ----------------------------------------------------

export const gridColumns: GridColDef<ItemList>[] = [
  // Keep ID for dev, but hide via columnVisibilityModel in the DataGrid (not here)
  {
    field: "id",
    headerName: "ID",
    width: 80,
    hideable: false, // prevents users from toggling it on/off
  },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 1.2,
    minWidth: 160,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1.5,
    minWidth: 220,
  },
  {
    field: "price",
    headerName: "Price ($)",
    type: "number",
    flex: 0.8,
    minWidth: 120,
    align: "right",
    headerAlign: "right",
    // MUI X v8: valueFormatter receives the value directly
    valueFormatter: (value) => formatCurrency(value),
  },
  {
    field: "date",
    headerName: "Date Added",
    flex: 0.9,
    minWidth: 150,
    valueFormatter: (value) => formatDate(value),
    sortComparator: dateSortComparator,
  },

  // Optional: an actions column that uses hidden row.id under the hood
  // {
  //   field: "actions",
  //   headerName: "Actions",
  //   sortable: false,
  //   filterable: false,
  //   width: 120,
  //   renderCell: (params) => (
  //     <Stack direction="row" spacing={1}>
  //       <IconButton size="small" onClick={() => onEdit(params.row.id)}>
  //         <EditIcon fontSize="small" />
  //       </IconButton>
  //       <IconButton size="small" color="error" onClick={() => onDelete(params.row.id)}>
  //         <DeleteIcon fontSize="small" />
  //       </IconButton>
  //     </Stack>
  //   ),
  // },
];

export default gridColumns;
