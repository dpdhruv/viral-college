import { Component, OnInit } from '@angular/core';
import { BackendService } from "../services/backend.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private _backend: BackendService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  public getOTPpayload={
    username:''
  }

  public resetPassPayload={
    otp:'',
    password:''
  }
  public confirmpassword='';

  public validators = {
    invalidUsername: false,
    Password: {
      invalidLength: false,
      missingAlphabet: false,
      missingSpecialCharacter: false,
      missingNumber: false
    },
    hasPasswordMatched: false
  };
  public passwordMatched;
  validatePassword(event) {
    if (event.length < 8) {
      this.validators.Password.invalidLength = true;
    } else {
      this.validators.Password.invalidLength = false;
    }

    if (event.search(/[A-z]/i) < 0) {
      this.validators.Password.missingAlphabet = true;
    }
    else {
      this.validators.Password.missingAlphabet = false;
    }

    if (event.search(/[0-9]/) < 0) {
      this.validators.Password.missingNumber = true;
    } else {
      this.validators.Password.missingNumber = false;
    }

    if (event.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
      this.validators.Password.missingSpecialCharacter = true;
    } else {
      this.validators.Password.missingSpecialCharacter = false;
    }
  }

  confirmPassword(event){
    if(event===this.resetPassPayload.password){
      this.passwordMatched = true
    }else{
      this.passwordMatched = false
    }
  }


  getOTP(){
    if(this.getOTPpayload.username==''){
      this.toastr.error("Username cannot be empty");
    }else{
     this._backend.resetOTP(this.getOTPpayload).subscribe(res=>{
      alert(res.otp);
      localStorage.setItem('auth_token',res.jwt);
     },err=>{
       console.log(err);
       this.toastr.error(err.message);
     }) 
    }
  }

  resetPass(){
    this._backend.newPassword(this.resetPassPayload).subscribe(res=>{
      console.log(res);
      this.toastr.success(res.message);
    },err=>{
      console.log(err);
      this.toastr.error(err.message);
    })
  }
}
