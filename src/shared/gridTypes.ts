export type ItemList = {
  id?: string | undefined;
  itemName?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  date?: string | undefined;
  category?: string;
};


export type ExpenseDraft = {
  itemName: string;
  description: string;
  price: string;
  category: string;
}