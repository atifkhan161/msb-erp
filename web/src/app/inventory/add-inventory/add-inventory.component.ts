import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Dealer } from 'src/app/model/dealer.model';
import { Inventory } from 'src/app/model/inventory.model';
import { Product } from 'src/app/model/product.model';
import { DealerService } from 'src/app/service/dealer.service';
import { InventoryService } from 'src/app/service/inventory-service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  inventoryForm!: FormGroup;
  isEditMode: boolean = false;
  inventory!: Inventory;
  products?: Product[];
  dealers?: Dealer[];
  transactions = new FormArray([]);

  constructor(
    private service: InventoryService,
    private dealerService: DealerService,
    private productService: ProductService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      inventory_id: new FormControl(
        {
          value: '',
          disabled: true
        }),
      total: new FormControl({ value: 0, disabled: true }),
      paid: new FormControl(0),
      dealer_id: new FormControl(null, Validators.required),
      date: new FormControl(this.getDateStruct(Date.now())),
      time: new FormControl(this.getTimeStruct(Date.now())),
      transactions: this.transactions
    });
    if (this.isEditMode) {
      this.inventoryForm.patchValue(this.inventory);
      for (let transaction of this.inventory.transactions) {
        this.transactions.push(new FormGroup({
          product_id: new FormControl(transaction.product_id, Validators.required),
          quantity: new FormControl(transaction.quantity),
          cost: new FormControl(transaction.cost)
        }));
      }
      this.inventoryForm.updateValueAndValidity();

    } else {
      this.createItem(0);
    }
    // Fetch product list
    this.productService.Get().subscribe(list => {
      this.products = list;
    });

    // Fetch dealers list
    this.dealerService.Get().subscribe(list => {
      this.dealers = list;
    });

    // Populate total cost value
    this.transactions.valueChanges
      .pipe(debounceTime(900))
      .subscribe(formValue => {
        let total = 0;
        for (let transaction of formValue) {
          total += transaction.cost;
          this.inventoryForm.patchValue({
            total: total
          });
          this.inventoryForm.updateValueAndValidity();
        }
      });
  }
  onSubmit() {
    const formVal: Inventory = this.inventoryForm.getRawValue();
    formVal.timestamp = new Date(formVal.date.year, formVal.date.month,
      formVal.date.day, formVal.time.hour, formVal.time.minute);
    if (this.isEditMode) {
      this.service.Edit(formVal).subscribe(data => {
        this.activeModal.close();
      });
    } else {
      this.service.Add(formVal).subscribe(data => {
        this.activeModal.close();
      });
    }
  }

  createItem(index: number) {
    this.transactions.push(new FormGroup({
      product_id: new FormControl(null, Validators.required),
      quantity: new FormControl(0),
      cost: new FormControl(0)
    }));
    this.inventoryForm.updateValueAndValidity();
  }

  removeItem(index: number) {
    this.transactions.removeAt(index);
    this.inventoryForm.updateValueAndValidity();
  }

  getDateStruct(val: number): NgbDateStruct {
    let date = new Date(val);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate()
    }
  }

  getTimeStruct(val: number): any {
    let date = new Date(val);
    return {
      hour: date.getHours(),
      minute: date.getMinutes()
    }
  }
}
