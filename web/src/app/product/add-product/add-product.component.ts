import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/product.model';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode: boolean = false;
  product!: Product;
  constructor(
    private service: ProductService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      product_id: new FormControl(
        {
          value: '',
          disabled: true
        }),
      name: new FormControl(this.isEditMode ? this.product.name : '', Validators.required),
      inventory: new FormControl(
        {
          value: '',
          disabled: true
        }),
    });
    if (this.isEditMode) {
      this.productForm.patchValue(this.product);
    }
  }
  onSubmit() {
    if (this.isEditMode) {
      this.service.Edit(this.productForm.getRawValue()).subscribe(data => {
        this.activeModal.close();
      });
    } else {
      this.service.Add(this.productForm.value).subscribe(data => {
        this.activeModal.close();
      });
    }
  }
}
