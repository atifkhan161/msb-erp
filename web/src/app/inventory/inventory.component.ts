import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Inventory } from '../model/inventory.model';
import { InventoryService } from '../service/inventory-service';
import { ToastService } from '../service/toast-service';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventories?: Inventory[];
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
    this.modalService.open(AddInventoryComponent, { size: 'lg' }).result.then(() => {
      this.toastService.success("Inventory added successfully");
      this.fetchList();
    });
  }

  editInventory(item: Inventory) {
    this.service.GetTransactions(item.inventory_id).subscribe((transactions) => {
      item.transactions = transactions;
      let modelRef = this.modalService.open(AddInventoryComponent, { size: 'lg' });
      modelRef.componentInstance.isEditMode = true;
      modelRef.componentInstance.inventory = item;
      modelRef.result.then(() => {
        this.toastService.info("Inventory updated.");
        this.fetchList();
      });
    });
  }

  delete(item: Inventory) {
    this.service.Delete(item).subscribe(() => {
      this.toastService.info("Inventory deleted successfully");
      this.fetchList();
    });
  }
}
