import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModel, ConfirmModelComponent } from '../components/confirm-model/confirm-model.component';

import { Dealer } from '../model/dealer.model';
import { DealerService } from '../service/dealer.service';
import { ToastService } from '../service/toast-service';
import { AddDealerComponent } from './add-dealer/add-dealer.component';
import { PayComponent } from './pay/pay.component';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {
  dealers?: Dealer[];
  constructor(
    private service: DealerService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.service.Get().subscribe(list => {
      this.dealers = list;
    });
  }
  addDealer() {
    this.modalService.open(AddDealerComponent).result.then((resp) => {
      if (resp != "Close click") {
        this.toastService.success("Dealer added successfully");
        this.fetchList();
      }
    });
  }

  editDealer(item: Dealer) {
    let modelRef = this.modalService.open(AddDealerComponent);
    modelRef.componentInstance.isEditMode = true;
    modelRef.componentInstance.dealer = item;
    modelRef.result.then((resp) => {
      if (resp != "Close click") {
        this.toastService.info("Dealer updated.");
        this.fetchList();
      }
    });
  }

  delete(item: Dealer) {
    let modelRef = this.modalService.open(ConfirmModelComponent);
    const data: ConfirmModel = {
      title: "Delete " + item.name,
      description: "Are you sure you want to delete " + item.name + " .This will delete all of its transaction and history?"
    };
    modelRef.componentInstance.data = data;
    modelRef.result.then((resp) => {
      if (resp) {
        this.service.Delete(item).subscribe((item) => {
          this.toastService.info("Dealer deleted successfully");
          this.fetchList();
        });
      }
    });
  }

  pay(item: Dealer) {
    let modelRef = this.modalService.open(PayComponent);
    modelRef.componentInstance.dealer = item;
    modelRef.result.then((resp) => {
      if (resp != "Close click") {
        this.toastService.info("Dealer updated.");
        this.fetchList();
      }
    });
  }
}
