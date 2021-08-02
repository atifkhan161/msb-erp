import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Trade, Transaction } from '../model/trade.model';


@Injectable({ providedIn: 'root' })
export class TradeService {
  constructor(
    private http: HttpClient,
  ) { }
  configUrl = 'http://localhost:8087/trade';

  Add(trade: Trade) {
    return this.http
      .post<Trade>(this.configUrl, trade);
  }

  Edit(trade: Trade) {
    return this.http
      .put<Trade>(this.configUrl, trade);
  }

  Get() {
    return this.http
      .get<Trade[]>(this.configUrl);
  }

  GetTransactions(id?: number) {
    return this.http
      .get<Transaction[]>(this.configUrl + "/transactions/" + id);
  }

  Delete(trade: Trade) {
    return this.http.post<Trade>(this.configUrl + "/delete", trade);
  }
}