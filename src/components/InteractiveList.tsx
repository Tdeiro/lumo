import * as React from "react";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Paper,
  Stack,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "../style/InteractiveList.css";
import gridColumns from "./GridColums";
import type { ItemList } from "../shared/gridTypes";
import DialogSelect from "./DialogSelect";
import { DEFAULT_PAGINATION } from "../vars";
import { useExpenses } from "../shared/hooks/useExpense";
import { useExpenseForm } from "../shared/hooks/useExpenseForm";
import { draftToItem } from "../shared/utils/expense";
import { ItemName } from "./gridLineItems/ItemName";
import { ItemDescription } from "./gridLineItems/ItemDescription";
import { ItemPrice } from "./gridLineItems/ItemPrice";

export const InteractiveList: React.FC = () => {
  const [categories, setCategories] = React.useState<string[]>([
    "Food",
    "Entertainment",
    "Bills",
  ]);

  const { items, add } = useExpenses();
  const { draft, setField, errors, validate, reset } = useExpenseForm();

  const addNewExpense = () => {
    if (!validate()) return;
    add(draftToItem(draft));
    console.log(draft);
    reset();
  };

  return (
    <div className="il-root">
      <div className="il-page-wrap">
        <div className="il-header">
          <div>
            <Typography variant="h3" className="il-title">
              Inventory Dashboard
            </Typography>
            <Typography variant="body2" className="il-subtitle">
              Modern, responsive, and tech-friendly.
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            className="il-cta"
            onClick={addNewExpense}
          >
            Add Item
          </Button>
        </div>
        <Paper elevation={0} className="il-filter-card">
          <Stack direction="row" className="il-filter-stack" spacing={2}>
            <ItemName
              value={draft.itemName}
              onChange={(v) => setField("itemName", v)}
              error={Boolean(errors.itemName)}
              helperText={errors.itemName}
            />
            <ItemDescription
              value={draft.description}
              onChange={(v) => setField("description", v)}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
            <ItemPrice
              value={draft.price}
              onChange={(v) => setField("price", v)}
              error={Boolean(errors.price)}
              helperText={errors.price}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                value={draft.category}
                onChange={(e) => setField("category", e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
                <DialogSelect
                  onSubmitNewCategory={(newItem) => {
                    if (!newItem.trim()) return;
                    setCategories((prev) =>
                      prev.includes(newItem) ? prev : [...prev, newItem]
                    );
                  }}
                />
              </Select>{" "}
            </FormControl>
          </Stack>
        </Paper>

        <Paper elevation={0} className="il-grid-card">
          <Box className="il-grid-header">
            <Typography variant="h6" className="il-grid-title">
              Item List
            </Typography>
            <Typography variant="body2" className="il-grid-subtitle">
              View, filter, and manage your inventory below.
            </Typography>
          </Box>

          <Box className="il-grid-wrap">
            <DataGrid<ItemList>
              rows={items}
              columns={gridColumns as GridColDef<ItemList>[]}
              getRowId={(r) =>
                r.id ?? `${r.itemName ?? ""}-${r.date ?? ""}-${Math.random()}`
              }
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
                pagination: { paginationModel: DEFAULT_PAGINATION },
              }}
              pageSizeOptions={[10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              density="comfortable"
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 300 },
                },
              }}
              className="il-grid"
            />
          </Box>
        </Paper>
      </div>
    </div>
  );
};
