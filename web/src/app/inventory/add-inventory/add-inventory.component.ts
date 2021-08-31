import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Dealer } from 'src/app/model/dealer.model';
import { Product } from 'src/app/model/product.model';
import { Trade } from 'src/app/model/trade.model';
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
  inventory!: Trade;
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
      amount: new FormControl({ value: 0, disabled: this.isEditMode }),
      dealer_id: new FormControl({ value: null, disabled: this.isEditMode }, Validators.required),
      date: new FormControl(this.getDateStruct(Date.now())),
      time: new FormControl(this.getTimeStruct(Date.now())),
      transactions: this.transactions
    });
    if (this.isEditMode) {
      this.inventoryForm.patchValue(this.inventory);
      for (let transaction of this.inventory.transactions) {
        this.transactions.push(new FormGroup({
          product_id: new FormControl({ value: transaction.product_id, disabled: true }),
          quantity: new FormControl({ value: transaction.quantity, disabled: true }),
          cost: new FormControl({ value: transaction.cost, disabled: true })
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
            total: total,
            amount: total
          });
          this.inventoryForm.updateValueAndValidity();
        }
      });
  }
  onSubmit() {
    const formVal: Trade = this.inventoryForm.getRawValue();
    formVal.timestamp = new Date(formVal.date.year, formVal.date.month - 1,
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
      month: date.getUTCMonth() + 1,
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
