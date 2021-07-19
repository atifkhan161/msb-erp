import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private http: HttpClient,
  ) { }
  configUrl = 'http://localhost:8087/product';

  Add(product: Product) {
    return this.http
      .post<Product>(this.configUrl, product);
  }

  Edit(product: Product) {
    return this.http
      .put<Product>(this.configUrl, product);
  }

  Get() {
    return this.http
      .get<Product[]>(this.configUrl);
  }

  Delete(product: Product) {
    return this.http.post<Product>(this.configUrl + "/delete", product);
  }
}