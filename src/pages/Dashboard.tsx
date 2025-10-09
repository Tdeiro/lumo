import { Button, TextField, Stack } from "@mui/material";
import OutlinedCard from "../components/Card";
import { useState } from "react";

export const Dashboard = () => {
  const [expense, setExpense] = useState("");
  const [expenseList, setExpenseList] = useState<string[]>([]);

  const handleExpenseChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExpense(event.target.value);
  };

  const addNewExpense = () => {
    const value = expense.trim();
    if (!value) return;
    setExpenseList((prev) => [...prev, value]);
    setExpense("");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          id="expense-input"
          label="Enter expense"
          variant="standard"
          value={expense}
          onChange={handleExpenseChange}
          fullWidth
        />
        <Button variant="outlined" onClick={addNewExpense}>
          Add
        </Button>
      </Stack>

      <OutlinedCard />

      <div>
        {expenseList.map((item, i) => (
          <p key={`${item}-${i}`}>{item}</p>
        ))}
      </div>
    </div>
  );
};
