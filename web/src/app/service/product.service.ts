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
}