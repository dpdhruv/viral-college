import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../services/backend.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  public coupon={
    coupon_code:'',
    coupon_value:'',
    coupon_message:'',
    available_at:0,
    expiry_date:Date.now()
  }
  public adding=false;
  constructor(private _backend:BackendService,private toastr:ToastrService) { }

  ngOnInit() {
  }

  createCoupon(){
    console.log(this.coupon);
    this.adding = true;
    this._backend.createCoupon(this.coupon).subscribe(res=>{
      console.log(res);
      this.adding = false;
      this.toastr.success(res.message);
    },err=>{
      console.log(err);
        this.adding = false;
        this.toastr.error("Sorry something went wrong");
    });
  }

}
