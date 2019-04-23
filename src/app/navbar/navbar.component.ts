import { Component, OnInit , Input } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    // console.log(this.showMenu)
    // console.log(this.whichPage);
  }

  private username;

  showMenu={
    isIndexPage:true,
    isReferralPage:false
  }

  get whichPage() {
    return this.showMenu;
  }

  @Input()
  set whichPage(value) {
    // console.log(value);
     this.showMenu = value;
  }

  get Username(){
    return this.username;
  }

  @Input()
  set Username(value){
    this.username = value;
  }

  Logout(){
    localStorage.removeItem('auth_token');
    if (localStorage.getItem('auth_token')==null){
      this.router.navigate(['/login']);
    }
  }

}
