import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModel, ConfirmModelComponent } from '../components/confirm-model/confirm-model.component';
import { Trade } from '../model/trade.model';
import { InventoryService } from '../service/inventory-service';
import { ToastService } from '../service/toast-service';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventories?: Trade[];
  constructor(
    private service: InventoryService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.service.Get().subscribe(list => {
      this.inventories = list;
    });
  }

  addInventory() {
    this.modalService.open(AddInventoryComponent, { size: 'lg' }).result.then((resp) => {
      if (resp != "Close click") {
        this.toastService.success("Inventory added successfully");
        this.fetchList();
      }
    });
  }

  editInventory(item: Trade) {
    // this.service.GetTransactions(item.trade_id).subscribe((transactions) => {
    //   item.transactions = transactions;
    let modelRef = this.modalService.open(AddInventoryComponent, { size: 'lg' });
    modelRef.componentInstance.isEditMode = true;
    modelRef.componentInstance.inventory = item;
    modelRef.result.then((resp) => {
      if (resp != "Close click") {
        this.toastService.info("Inventory updated.");
        this.fetchList();
      }
    });
    // });
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
          this.toastService.info("Inventory deleted successfully");
          this.fetchList();
        });
      }
    });
  }
}
