import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trade, Transaction } from '../model/trade.model';



@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(
    private http: HttpClient,
  ) { }
  configUrl = 'http://localhost:8087/inventory';

  Add(inventory: Trade) {
    return this.http
      .post<Trade>(this.configUrl, inventory);
  }

  Edit(inventory: Trade) {
    return this.http
      .put<Trade>(this.configUrl, inventory);
  }

  Get(data?: any) {
    return this.http
      .get<Trade[]>(this.configUrl, { params: data });
  }

  GetTransactions(id?: number) {
    return this.http
      .get<Transaction[]>(this.configUrl + "/transactions/" + id);
  }

  Delete(inventory: Trade) {
    return this.http.post<Trade>(this.configUrl + "/delete", inventory);
  }
}