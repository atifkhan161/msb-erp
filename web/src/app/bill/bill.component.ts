import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Dealer } from '../model/dealer.model';

import { Trade } from '../model/trade.model';
import { DealerService } from '../service/dealer.service';
import { TradeService } from '../service/trade-service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  isEditMode: boolean = false;
  trade!: Trade;
  dealer$!: Observable<Dealer>;

  constructor(
    private dealerService: DealerService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.dealer$ = this.dealerService.GetById(this.trade.dealer_id);
  }

  get status(): string {
    let status = 'Pending';
    if (this.trade.total === 0 ||
      (this.trade.total - this.trade.amount) === 0) {
      status = 'Paid';
    }
    return status;
  }
}