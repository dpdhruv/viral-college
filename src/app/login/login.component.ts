import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { User } from '../user';
import { BackendService} from '../services/backend.service'
import { Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading= false;
  public response;
  public user : User;
  public serverError ={
    message:'',
    flag:false
  };
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
  public  passwordNotMatched;
  private password:String;
  constructor(private backendService:BackendService,
    public router: Router, private spinner: NgxSpinnerService) {
      this.spinner.show();
    }

  public credentials;
  ngOnInit()
  {
    this.spinner.hide()
  }

  verifyUser(loginForm)
  {
    this.spinner.hide();
    this.loading = true;
    this.spinner.show();
    this.user = (loginForm);
    this.backendService.getUser(this.user).subscribe(res=>{
      this.loading = false;
      this.serverError.flag = false;
       console.log("Successfully Logged In!!!");
       this.router.navigate(['/referral']);
      localStorage.setItem('auth_token',res.jwt);

    },
    err=>{
      this.spinner.hide();
      this.loading = false;
      this.serverError.flag = true;
      this.serverError.message = err.error.message;
    });

  }
}
