export interface Transaction {
  transaction_id?: number;
  quantity: number;
  cost: number;
  product_id: number;
  trade_id?: number;
  timestamp: Date;
  name?: string;
}

export interface Trade {
  trade_id?: number;
  dealer_id: number;
  total: number;
  amount: number;
  Dealer_Name?: string;
  timestamp: Date;
  transactions: Transaction[];
  date?: any;
  time?: any;
}