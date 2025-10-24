// hooks/useExpenses.ts
import * as React from "react";
import type { ItemList } from "../gridTypes";


export function useExpenses(initial: ItemList[] = []) {
  const [items, setItems] = React.useState<ItemList[]>(initial);

  const add = React.useCallback((item: ItemList) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const update = React.useCallback((id: string, patch: Partial<ItemList>) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);

  return { items, add, remove, update, setItems };
}
