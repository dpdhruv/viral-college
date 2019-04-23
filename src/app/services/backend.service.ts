import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './../user';




@Injectable({
  providedIn: 'root'
})
export class BackendService
{


  baseUrl = environment.backendService;



  constructor(private httpClient : HttpClient)
  {}
   headers = new HttpHeaders({ 'Content-type': 'application/json','withCredentials':'true' });
   header_token = new HttpHeaders().append('access-token', localStorage.getItem('auth_token'));
  // usernmeAvailibility(username){
  //   console.log(username);
  //   return this.httpClient.get(this.baseUrl+'/username/'+username);
  // }


   getOTP(contact){
   // console.log(contact);
    let data = {'phone_no':contact};
     //console.log(JSON.stringify({ phone_no: data.phone_no }));
    return this.httpClient.post(this.baseUrl+'/getotp',JSON.stringify({phone_no:data.phone_no}),{headers:this.headers})
  }

  resetOTP(payload){
  //  console.log(payload);
    // var headers = new HttpHeaders().append('access-token', localStorage.getItem('auth_token'));
    // console.log("reset:"+headers)
    return this.httpClient.post<any>(this.baseUrl+'/resetpassword',payload)
  }

  newPassword(payload){
    var headers = new HttpHeaders().append('access-token', localStorage.getItem('auth_token'));
    return this.httpClient.post<any>(this.baseUrl+'/verification/sms/resetpassword',payload,{headers:headers})
  }

// sign up function
  AddUser(user : User)
  {
  //  console.log(user)

    let postUser = JSON.stringify(user);
   // console.log(postUser)
  //  console.log(this.headers)
    return this.httpClient.post<any>(this.baseUrl+'/signup',user);
  }

// LogIn function
  public getUser(credentials)
  {


      let userCredentials = JSON.stringify(credentials);
    //  console.log(userCredentials);
      return this.httpClient.post<any>(this.baseUrl+'/login',credentials);
  }
  getUserDetail(){
   this.header_token = new HttpHeaders().append('access-token', localStorage.getItem('auth_token'));
    //console.log(headers);
    return this.httpClient.get<any>(this.baseUrl+'/user',{headers:this.header_token});
  }

  getUserCoupons(){
    this.header_token = new HttpHeaders().append('access-token', localStorage.getItem('auth_token'));
    //console.log("coupons header:"+" "+headers);
    return this.httpClient.get<any>(this.baseUrl + '/coupons', { headers: this.header_token});
  }

  getReferredUsersCount(){
  this.header_token = new HttpHeaders().append('access-token', localStorage.getItem('auth_token'));
    return this.httpClient.get<any>(this.baseUrl + '/referred_users', { headers: this.header_token});
  }


  public loggedin(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  // Admin Side apis starts //

  redeem(redeemDetails){
    return this.httpClient.post<any>(this.baseUrl+'/admin/validation/redeem',redeemDetails)
  }

  getAllCoupons(){
    return this.httpClient.get<any>(this.baseUrl+'/admin/coupons');
  }

  createCoupon(coupon){
    return this.httpClient.post<any>(this.baseUrl+'/admin/createCoupon',coupon);
  }

  analytics(){
    return this.httpClient.get<any>(this.baseUrl+'/admin/analytics');
  }

  updateCoupon(coupon){
    return this.httpClient.put<any>(this.baseUrl+'/admin/coupon',coupon)
  }

  deleteCoupon(coupon){
    return this.httpClient.delete(this.baseUrl+'/admin/coupon',coupon)
  }

  // Admin Side apis end //

  }



