import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export const ItemPrice: React.FC<{
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  helperText: string;
}> = ({ value, onChange, error, helperText }) => {
  return (
    <>
      <TextField
        error={error}
        label="Price"
        size="small"
        value={value}
        helperText={helperText}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputMode: "decimal",
        }}
      />
    </>
  );
};
