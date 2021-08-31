import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Dealer } from 'src/app/model/dealer.model';
import { Trade } from 'src/app/model/trade.model';
import { DealerService } from 'src/app/service/dealer.service';
import { TradeComponent } from 'src/app/trade/trade.component';

export interface PayModel {
  dealer_id: number;
  name: string;
  amount: number;
  paying: number;
  date?: any;
  time?: any;
}

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  payForm!: FormGroup;
  dealer!: Dealer;
  constructor(
    private service: DealerService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.payForm = new FormGroup({
      dealer_id: new FormControl(
        {
          value: this.dealer.dealer_id,
          disabled: true
        }),
      name: new FormControl({ value: this.dealer.name, disabled: true }),
      paying: new FormControl(0),
      date: new FormControl(this.getDateStruct(Date.now())),
      time: new FormControl(this.getTimeStruct(Date.now())),
      amount: new FormControl({ value: this.dealer.amount, disabled: true }),
    });
  }
  onSubmit() {
    const formVal: PayModel = this.payForm.getRawValue();
    let trade: Trade = {
      dealer_id: this.dealer.dealer_id ? this.dealer.dealer_id : 0,
      total: 0,
      amount: this.payForm.value.paying,
      timestamp: new Date(formVal.date.year, formVal.date.month - 1,
      formVal.date.day, formVal.time.hour, formVal.time.minute),
      transactions: []
    }
    this.service.Pay(trade).subscribe(data => {
      this.activeModal.close();
    });
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
