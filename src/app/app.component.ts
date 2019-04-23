import { Component } from '@angular/core';
import { User } from './user';
import {  BackendService } from './services/backend.service'

@Component({
  selector: 'landing',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  
  constructor(private backendService : BackendService)
  {}

  ngOninit()
  {
   


  //   this.backendService.AddUser(user).subscribe((res)=>{
  //     console.log("Created a customer");
  //   });
  //     this.backendService.getUser().subscribe((res)=>{
  //       this.backendService.getUser(this.backendService.nextPage).subscribe((res)=>{
  //         console.log("logged in to the system");
  //       });       
   

  // });
  }

} 