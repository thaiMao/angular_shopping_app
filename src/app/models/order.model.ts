import { Item } from './item.model';

export interface Order {
  id: number;
  total: number;
  cart: Array<Item>;
  sessionId: number;
  date: Date;
}
