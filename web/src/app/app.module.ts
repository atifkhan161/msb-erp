import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorIntercept } from './error.interceptor';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './service/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { allIcons, ColorTheme, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

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
    AddProductComponent
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
    multi: true
  },
    ProductService,
    // UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
