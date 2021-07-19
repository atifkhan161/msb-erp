import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products?: Product[];
  constructor(
    private service: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.service.Get().subscribe(list => {
      this.products = list;
    });
  }
  addProduct() {
    this.modalService.open(AddProductComponent).result.then(()=>{
      this.fetchList();
    });
  }

  editProduct(item: Product) {
    let modelRef = this.modalService.open(AddProductComponent);
    modelRef.componentInstance.isEditMode = true;
    modelRef.componentInstance.product = item;
    modelRef.result.then(()=>{
      this.fetchList();
    });
  }

  delete(item: Product) {
    this.service.Delete(item).subscribe((item) => {
      alert("Item deleted successfully");
      this.fetchList();
    });
  }
}
