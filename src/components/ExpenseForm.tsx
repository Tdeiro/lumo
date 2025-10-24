import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Button,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import DialogSelect from "./DialogSelect";
import { InteractiveList } from "./InteractiveList";
import type { ItemList } from "../shared/gridTypes";

export default function ExpenseForm() {
  const [totalAmount, setTotalAmount] = React.useState(0);

  // React.useEffect(() => {
  //   setTotalAmount(
  //     expenseList.reduce((acc, p) => acc + Number(p.price || 0), 0)
  //   );
  // }, [expenseList]);

  return (
    <div style={{ marginTop: 16 }}>
      <div>
        <InteractiveList />
        <h3>Total: {totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}
