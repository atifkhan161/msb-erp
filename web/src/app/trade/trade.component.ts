import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BillComponent } from '../bill/bill.component';
import { ConfirmModel, ConfirmModelComponent } from '../components/confirm-model/confirm-model.component';
import { Trade } from '../model/trade.model';
import { ToastService } from '../service/toast-service';
import { TradeService } from '../service/trade-service';
import { AddTradeComponent } from './add-trade/add-trade.component';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  tradeList?: Trade[];
  constructor(
    private service: TradeService,
    private toastService: ToastService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.service.Get().subscribe(list => {
      this.tradeList = list;
    });
  }

  add() {
    this.modalService.open(AddTradeComponent, { size: 'lg' }).result.then(() => {
      this.toastService.success("Dealing added successfully");
      this.fetchList();
    });
  }

  edit(item: Trade) {
    this.service.GetTransactions(item.trade_id).subscribe((transactions) => {
      item.transactions = transactions;
      let modelRef = this.modalService.open(AddTradeComponent, { size: 'lg' });
      modelRef.componentInstance.isEditMode = true;
      modelRef.componentInstance.trade = item;
      modelRef.result.then(() => {
        this.toastService.info("Dealing updated.");
        this.fetchList();
      });
    });
  }

  delete(item: Trade) {
    let modelRef = this.modalService.open(ConfirmModelComponent);
    const data: ConfirmModel = {
      title: "Remove Trade entry of" + item.Dealer_Name,
      description: "Are you sure you want to remove Trade entry of customer " + item.Dealer_Name + " ?",
    };
    modelRef.componentInstance.data = data;
    modelRef.result.then((resp) => {
      if (resp) {
        this.service.Delete(item).subscribe(() => {
          this.toastService.info("Dealing deleted successfully");
          this.fetchList();
        });
      }
    });

  }

  print(item: Trade) {
    this.service.GetTransactions(item.trade_id).subscribe((transactions) => {
      item.transactions = transactions;
      let modelRef = this.modalService.open(BillComponent, { size: 'lg' });
      modelRef.componentInstance.isEditMode = true;
      modelRef.componentInstance.trade = item;
      modelRef.result.then(() => {
      });
    });
  }

}
