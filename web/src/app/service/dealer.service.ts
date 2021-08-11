import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dealer } from '../model/dealer.model';

@Injectable({ providedIn: 'root' })
export class DealerService {
  constructor(
    private http: HttpClient,
  ) { }
  configUrl = 'http://localhost:8087/dealer';

  Add(dealer: Dealer) {
    return this.http
      .post<Dealer>(this.configUrl, dealer);
  }

  Edit(dealer: Dealer) {
    return this.http
      .put<Dealer>(this.configUrl, dealer);
  }

  Get() {
    return this.http
      .get<Dealer[]>(this.configUrl);
  }

  GetById(Id: number) {
    return this.http
      .get<Dealer>(this.configUrl + "/" + Id);
  }

  Delete(dealer: Dealer) {
    return this.http.post<Dealer>(this.configUrl + "/delete", dealer);
  }

  Pay(dealer: Dealer) {
    return this.http.put<Dealer>(this.configUrl + "/pay", dealer);
  }
}