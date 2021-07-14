import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './service/user.service';

@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,) { };

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      alert("You don't have permission to view this page");
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
