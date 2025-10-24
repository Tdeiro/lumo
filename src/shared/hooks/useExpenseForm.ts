import * as React from "react";

import type { ExpenseDraft } from "../gridTypes";
import { validateExpenseDraft } from "../utils/expense";

const EMPTY: ExpenseDraft = { itemName: "", description: "", price: "", category: "" };

export function useExpenseForm(initial?: Partial<ExpenseDraft>) {
  const [draft, setDraft] = React.useState<ExpenseDraft>({ ...EMPTY, ...initial });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const setField = <K extends keyof ExpenseDraft>(key: K, value: ExpenseDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const validate = () => {
    const e = validateExpenseDraft(draft);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setDraft(EMPTY);
    setErrors({});
  };

  return { draft, setField, errors, validate, reset, setDraft, setErrors } }