import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponentComponent } from './index-component/index-component.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ReferralpageComponent } from './referralpage/referralpage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {BackendService} from './services/backend.service';
import { AuthGuard } from './auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServerErrorComponent } from './notifications/server-error/server-error.component';
import { AdminComponent } from './admin-vieiw/admin/admin.component';
import { HomeComponent } from './admin-vieiw/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewCouponComponent } from './admin-vieiw/Coupons/view-coupon/view-coupon.component';
import { AddCouponComponent } from './admin-vieiw/Coupons/add-coupon/add-coupon.component';
import { AnalyticsComponent } from './admin-vieiw/analytics/analytics.component';
import { LoaderComponent } from './loader/loader.component';
import { AdminLoaderComponent } from './admin-vieiw/admin-loader/admin-loader.component';
import { ChartsModule } from 'ng2-charts';

//import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponentComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ReferralpageComponent,
    ServerErrorComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    ViewCouponComponent,
    AddCouponComponent,
    AnalyticsComponent,
    LoaderComponent,
    AdminLoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule
  ],
  providers: [BackendService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
