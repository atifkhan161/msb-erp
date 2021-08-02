import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarModule } from 'ng-sidebar';
import { allIcons, ColorTheme, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDealerComponent } from './dealers/add-dealer/add-dealer.component';
import { DealersComponent } from './dealers/dealers.component';
import { ErrorIntercept } from './error.interceptor';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { DealerService } from './service/dealer.service';
import { ProductService } from './service/product.service';
import { ToastsContainer } from './service/toast-container.component';
import { ToastService } from './service/toast-service';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { TradeComponent } from './trade/trade.component';
import { AddTradeComponent } from './trade/add-trade/add-trade.component';

// import { UserService } from './service/user.service';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    InventoryComponent,
    ProductComponent,
    AddProductComponent,
    DealersComponent,
    ToastsContainer,
    AddDealerComponent,
    AddInventoryComponent,
    TradeComponent,
    AddTradeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SidebarModule.forRoot(),
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons, {
      width: '2em',
      height: '2em',
      theme: ColorTheme.Primary,
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercept,
    deps:[ToastService],
    multi: true
  },
    ProductService,
    DealerService,
    ToastService,
    // UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
