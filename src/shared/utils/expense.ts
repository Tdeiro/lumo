import type { ExpenseDraft, ItemList } from "../gridTypes";


export type ValidationError = Partial<Record<keyof ExpenseDraft, string>>;

export function validateExpenseDraft(d: ExpenseDraft): ValidationError {
  const errors: ValidationError = {};
  if (!d.itemName.trim()) errors.itemName = "Required";
  if (!d.description.trim()) errors.description = "Required";
  if (!d.category.trim()) errors.category = "Required";

  const n = Number(d.price);
  if (d.price.trim() === "" || !Number.isFinite(n) || n <= 0) {
    errors.price = "Enter a valid amount";
  }
  return errors;
}

export function draftToItem(d: ExpenseDraft): ItemList {
  return {
    id: crypto.randomUUID(),
    itemName: d.itemName.trim(),
    description: d.description.trim(),
    price: Number(d.price),
    date: new Date().toISOString(),
    category: d.category.trim(),
  };
}
