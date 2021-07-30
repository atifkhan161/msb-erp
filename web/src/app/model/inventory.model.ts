export interface Transaction {
  transaction_id?: number;
  quantity: number;
  cost: number;
  product_id: number;
  inventory_id?: number;
  timestamp?: Date;
}

export interface Inventory {
  inventory_id?: number;
  dealer_id: number;
  total: number;
  paid: number;
  Dealer_Name?: string;
  timestamp?: Date;
  transactions: Transaction[];
  date?: any;
  time?: any;
}