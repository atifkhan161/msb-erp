import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModel, ConfirmModelComponent } from '../components/confirm-model/confirm-model.component';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { ToastService } from '../service/toast-service';
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
    private toastService: ToastService,
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
    this.modalService.open(AddProductComponent).result.then(() => {
      this.toastService.success("Dealer added successfully");
      this.fetchList();
    });
  }

  editProduct(item: Product) {
    let modelRef = this.modalService.open(AddProductComponent);
    modelRef.componentInstance.isEditMode = true;
    modelRef.componentInstance.product = item;
    modelRef.result.then(() => {
      this.toastService.info("Product updated.");
      this.fetchList();
    });
  }

  delete(item: Product) {
    let modelRef = this.modalService.open(ConfirmModelComponent);
    const data: ConfirmModel = {
      title: "Remove " + item.name,
      description: "Are you sure you want to delete " + item.name + " ?"
    };
    modelRef.componentInstance.data = data;
    modelRef.result.then((resp) => {
      if (resp) {
        this.service.Delete(item).subscribe((item) => {
          this.toastService.info("Product deleted successfully");
          this.fetchList();
        });
      }
    });
  }
}
