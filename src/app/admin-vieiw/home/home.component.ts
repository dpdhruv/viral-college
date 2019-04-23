import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _backend:BackendService,private toastr:ToastrService) { }

  ngOnInit() {
  }

  redeemValue={
    user:'',
    coupon:''
  }

  loading=false;

  redeemCoupon(){
    console.log(this.redeemValue);
    this.loading=true;
    if(this.redeemValue.user==''&& this.redeemValue.coupon==''){
      this.loading = false;
      this.toastr.error("Please fill all the values");
    }else{
      this._backend.redeem(this.redeemValue).subscribe(res => {
       // console.log(res);
        this.loading = false;
        this.toastr.success(res.message);
      },
        err => {
         // console.log(err);
          this.loading = false;
          this.toastr.error(err.message);
        });
    }
  }

}
