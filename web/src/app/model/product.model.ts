import { Base } from "./loki.common";

export interface Product extends Base {
  product_id?: number;
  name: string;
  inventory?: number;
  timestamp?: Date;
}