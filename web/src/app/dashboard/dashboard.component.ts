import { Component, OnInit } from '@angular/core';

import { Trade } from '../model/trade.model';
import { InventoryService } from '../service/inventory-service';
import { TradeService } from '../service/trade-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  inventories?: Trade[];
  tradeList?: Trade[];

  constructor(
    private tradeService: TradeService,
    private inventoryService: InventoryService,
  ) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.inventoryService.Get({limit: 50}).subscribe(list => {
      this.inventories = list;
    });
    this.tradeService.Get({limit: 50}).subscribe(list => {
      this.tradeList = list;
    });
  }
}
