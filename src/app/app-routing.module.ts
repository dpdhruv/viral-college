import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import {IndexComponentComponent} from './index-component/index-component.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ReferralpageComponent } from './referralpage/referralpage.component';
import { AdminComponent } from './admin-vieiw/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './admin-vieiw/home/home.component';
import { ViewCouponComponent } from './admin-vieiw/Coupons/view-coupon/view-coupon.component';
import { AddCouponComponent } from './admin-vieiw/Coupons/add-coupon/add-coupon.component';
import { AnalyticsComponent } from './admin-vieiw/analytics/analytics.component';


const routes: Routes = [
  {
    path:'',
    component:IndexComponentComponent
  },

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'SignUp',
    children:[
      {
        path:'',
        component:SignupComponent
      },
      {
        path:':token',
        component:SignupComponent
      }

    ]
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent
  },

  {
    path:'referral',
    component:ReferralpageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path:'coupons/view',
        component:ViewCouponComponent
      },
      {
        path:'coupons/add',
        component:AddCouponComponent
      },
      {
        path:'analytics',
        component:AnalyticsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ LoginComponent,IndexComponentComponent]
