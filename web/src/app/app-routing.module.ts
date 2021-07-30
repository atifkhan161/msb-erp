import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDealerComponent } from './dealers/add-dealer/add-dealer.component';
import { DealersComponent } from './dealers/dealers.component';
import { HomeComponent } from './home/home.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { ToastService } from './service/toast-service';
import { UserService } from './service/user.service';

@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,) { };

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.toastService.warn("You don't have permission to view this page");
      this.router.navigate(["login"]);
      return false;
    }
  }
}
export const AUTH_PROVIDERS = [OnlyLoggedInUsersGuard];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [OnlyLoggedInUsersGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'product', component: ProductComponent },
      { path: 'dealer', component: DealersComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'add-dealer', component: AddDealerComponent },
      { path: 'add-inventory', component: AddInventoryComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // providers: AUTH_PROVIDERS,
  exports: [RouterModule]
})
export class AppRoutingModule { }
