import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Inventory, Transaction } from '../model/inventory.model';


@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(
    private http: HttpClient,
  ) { }
  configUrl = 'http://localhost:8087/inventory';

  Add(inventory: Inventory) {
    return this.http
      .post<Inventory>(this.configUrl, inventory);
  }

  Edit(inventory: Inventory) {
    return this.http
      .put<Inventory>(this.configUrl, inventory);
  }

  Get() {
    return this.http
      .get<Inventory[]>(this.configUrl);
  }

  GetTransactions(id?: number) {
    return this.http
      .get<Transaction[]>(this.configUrl + "/transactions/" + id);
  }

  Delete(inventory: Inventory) {
    return this.http.post<Inventory>(this.configUrl + "/delete", inventory);
  }
}