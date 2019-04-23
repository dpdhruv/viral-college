import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {BackendService} from './services/backend.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  
    constructor(private _backendService: BackendService,
                private _router: Router){}
  
      canActivate(): boolean{
      if (this._backendService.loggedin())
      {
        return true
      } 
      else 
      {
        this._router.navigate(['/login'])
        return false
      }
    } 
 
}

