import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-referralpage',
  templateUrl: './referralpage.component.html',
  styleUrls: ['./referralpage.component.css']
})
export class ReferralpageComponent implements OnInit {

  constructor(private backend:BackendService ,  private spinner:NgxSpinnerService,private router:Router) {
    this.loader.showLoader = true;
  }

  public userDetails;
  public coupons;
  public stats;
  public milestone;

  public url;

  public loader={
    isUserDetailsFetched:false,
    isCouponsFetched:false,
    isMilestoneFetched:false,
    showLoader:true
  }

  public emptyCoupons = false;

  showMenu={
    isIndexPage:false,
    isReferralPage:true
  }
  public encodedUrl;
  hideSpinner=0;

  ngOnInit()
  {
  //  this.spinner.show();
    // Get User Details Starts //
    this.backend.getUserDetail().subscribe(res => {
      console.log(res);
      this.userDetails = res;
      console.log(this.userDetails);
      let uri = 'http://localhost:4200/SignUp/' + this.userDetails.user.referral_token;
      this.encodedUrl = encodeURI(uri);
      this.loader.isUserDetailsFetched = true;
      this.checkIfLoading();
    },
    err => {
      console.log(err);
      this.loader.isUserDetailsFetched = true;
      this.checkIfLoading();
      alert("Sorry , had problems fetching data, redirecting to login page....");
      this.router.navigate(['/login']);
    });

    //Get User Details Ends //

    // Get User Coupons Starts //

    this.backend.getUserCoupons().subscribe(res=>{
//      console.log(res);
      this.coupons = res.coupons;
      if(this.coupons.length==0){
          this.emptyCoupons=true;
      }
//      console.log(this.coupons);
      this.milestone=res.milestone;
//      console.log(this.milestone);
      this.loader.isCouponsFetched = true;
      this.loader.isMilestoneFetched = true;
      this.checkIfLoading();
    },
    err=>{
      console.log(err);
      this.loader.isCouponsFetched = true;
      this.loader.isMilestoneFetched = true;
      this.checkIfLoading();
    });

    //Get User Coupons Ends //

    //Get User Referred Count Starts //

    this.backend.getReferredUsersCount().subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    })
    //Get User Referred Count Ends //
  }

  checkIfLoading(){
    if (this.loader.isUserDetailsFetched && this.loader.isCouponsFetched && this.loader.isMilestoneFetched) {
      this.loader.showLoader = false;
      console.log("loaded..." + this.loader.showLoader)
    }
  }



}
