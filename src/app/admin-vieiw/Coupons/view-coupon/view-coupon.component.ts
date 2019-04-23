import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.css']
})
export class ViewCouponComponent implements OnInit {
  public loading=true;
  constructor(private toastr:ToastrService,private spinner:NgxSpinnerService,private _backend: BackendService) { }
  public coupons = [];
  public coupon_edit={
    id:'',
    code:'',
    coupon_value:'',
    coupon_message:'',
    status:'',
    available_at:'',
    expiry_date:''
  }
  public couponId;
  public showEditForm=[];
  public hideCoupon=[];
  public current_index;
  ngOnInit() {
    this.loading =true;
    this._backend.getAllCoupons().subscribe(coupons=>{
      console.log(coupons);
      this.coupons = coupons;
      this.loading= false;
    },err=>{
      console.log(err);
      this.loading = false;
    })
    for(let i=0;i<this.coupons.length;i++){
      this.showEditForm[i].push(false);
    }
  }
  edit(index){
    this.current_index = index;
    this.coupon_edit = {
      id: this.coupons[index].id,
      code: this.coupons[index].code,
      coupon_value: this.coupons[index].coupon_value,
      coupon_message: this.coupons[index].coupon_message,
      status: this.coupons[index].status,
      available_at: this.coupons[index].available_at,
      expiry_date: this.coupons[index].expiry_date
    }
    this.showEditForm[index] = !this.showEditForm[index];
  }
  upadateCoupon(){
    console.log(this.coupon_edit)
    this._backend.updateCoupon(this.coupon_edit).subscribe(res=>{
      console.log(res);
      this.toastr.success(res.message);
      this.showEditForm[this.current_index]=!this.showEditForm[this.current_index];
    },err=>{
      console.log(err);
      this.toastr.success(err.message);
    })
  }

  // delete(index){
  //   this.couponId=this.coupons[index].id;
  //   this._backend.deleteCoupon(this.couponId).subscribe(res=>{
  //     this.toastr.success("Coupon Deleted");
  //   },err=>{
  //     this.toastr.error("Error Occured , Try Again");
  //   })
  // }
}
