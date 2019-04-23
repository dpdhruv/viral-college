import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ElementRef, ViewChild} from '@angular/core';
import {User} from "../user";
import { BackendService } from "../services/backend.service";
import { Router , ActivatedRoute , ParamMap } from '@angular/router'



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit, OnInit{

  public gettingOTP=false;
  public serverError = {
    message: '',
    flag: false
  };
  public loading=false;
  public errorMessage;
  public user:User;
  public data;
  public response;
  public errorFlag = false;
  public validators={
    invalidUsername:false,
    Password:{
      invalidLength:false,
      missingAlphabet:false,
      missingSpecialCharacter:false,
      missingNumber:false
    },
    hasPasswordMatched: false
  };
  public showLoader = false;
  public isUsernameAvailable;
  public showusernamecheck=false;


  public  passwordNotMatched;
  private password:String;
  public referral_token;
  public loadOTP=false;

  constructor(private backendService:BackendService ,private router:Router , private ActiveRoute: ActivatedRoute) {
    this.ActiveRoute.paramMap.subscribe((params: ParamMap) => {
      let referral_token = params.get('token');
      this.referral_token = referral_token;
      console.log(this.referral_token);
    //  console.log(this.referralCode.nativeElement.value)
    //  this.referralCode.nativeElement.value = this.referral_token;
    //  console.log(this.referralCode.nativeElement.value)
    });
   }
  @ViewChild('referralCode') referralCode: ElementRef;

  ngAfterViewInit(){
  }


  ngOnInit() {

  }

  // checkUsername(event){
  //   if(!(event=='')){
  //     this.backendService.usernmeAvailibility(event).subscribe(res => {
  //       this.showusernamecheck = true;
  //       this.isUsernameAvailable = res;
  //       console.log(this.isUsernameAvailable);
  //     },
  //       err => {
  //         console.log(err);
  //       });
  //   }
  // }

  // Custom Form Validation //
  validateUsername(event){
    var regex = /^[0-9]/g
    if(event.match(regex)){
      this.validators.invalidUsername = true;
    }else{
      this.validators.invalidUsername = false;
    }
  }

  validatePassword(event){
    if(event.length < 8){
      this.validators.Password.invalidLength = true;
    }else{
      this.validators.Password.invalidLength = false;
    }

    if(event.search(/[A-z]/i)<0){
      this.validators.Password.missingAlphabet = true;
    }
    else{
      this.validators.Password.missingAlphabet = false;
    }

    if(event.search(/[0-9]/)<0){
      this.validators.Password.missingNumber = true;
    }else{
      this.validators.Password.missingNumber = false;
    }

    if (event.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
      this.validators.Password.missingSpecialCharacter = true;
    } else {
      this.validators.Password.missingSpecialCharacter = false;
    }
        this.password = event;
  }

  confirmPassword(event){
    if(this.password == event){
      this.validators.hasPasswordMatched= true;
      this.passwordNotMatched = false;
    }
    else{
      this.passwordNotMatched = true;
    }
  }

  // Custom Form Validation //


  get_OTP(number){
    this.data = number;
    this.loadOTP = true;
    console.log("Outside:"+this.loadOTP);
    this.backendService.getOTP(this.data).subscribe(res=>{
      //console.log(res);
      this.response = res;
      console.log(this.response.otp);
      this.loadOTP = false;
      console.log("inside:" + this.loadOTP);
      alert(this.response.otp);
    },
    err=>{
      this.serverError.flag = true;
      this.serverError.message = err.error.message;
      alert(this.serverError.message);
      this.loadOTP = false;
    });
  }
  sendUserData(userForm){
    this.loading = true;
   this.user=(userForm);
   console.log(this.user);
   this.backendService.AddUser(this.user).subscribe(res=>{
     this.serverError.flag = false;
     this.loading = false;
     console.log(res);
     localStorage.setItem('auth_token',res.jwt);
     this.router.navigate(['/referral']);
   },
   err=>{
     this.loading = false;
     this.serverError.flag = true;
     this.serverError.message = err.error.message;
     alert(this.serverError.message);
     console.log(this.serverError.flag);
     console.log(err);
   });
  }
}
