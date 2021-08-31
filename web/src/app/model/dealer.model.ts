import { Base } from "./loki.common";

export interface Dealer  extends Base {
  dealer_id?: number;
  name: string;
  number?: number;
  amount?: number;
  email?: string;
  notes?: string;
  timestamp?: Date;
}