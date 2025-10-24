import { TextField } from "@mui/material";
import React from "react";

export const ItemDescription: React.FC<{
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  helperText: string;
}> = ({ value, onChange, error, helperText }) => {
  return (
    <>
      <TextField
        error={error}
        fullWidth
        label="Item Description"
        size="small"
        helperText={helperText}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
