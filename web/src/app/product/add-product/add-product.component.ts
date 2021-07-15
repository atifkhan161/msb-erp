import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private service: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    this.service.Add(this.productForm.value).subscribe(data => {
      this.location.back();
    });
  }

  Back() {
    this.location.back();
  }
}
