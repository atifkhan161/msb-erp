import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dealer } from 'src/app/model/dealer.model';
import { DealerService } from 'src/app/service/dealer.service';

export interface PayModel {
  dealer_id: number;
  name: string;
  amount: number;
  paying: number;
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
      amount: new FormControl({ value: this.dealer.amount, disabled: true }),
    });
  }
  onSubmit() {
    this.service.Pay(this.payForm.getRawValue()).subscribe(data => {
      this.activeModal.close();
    });
  }

}
