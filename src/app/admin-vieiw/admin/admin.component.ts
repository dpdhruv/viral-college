import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private route:Router,private ActiveRoute:ActivatedRoute) { }

  public show={
    coupon:false,
  };

//  public hasLanded=true;

  ngOnInit() {
//    if(this.hasLanded){
     // this.route.navigate(['home'],{relativeTo:this.ActiveRoute});
//    }
  }


}
