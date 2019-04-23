import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor() { }

  private _message;

  get serverError(){
    return this._message;
  }

  @Input()
  set serverError(value){
    console.log(value);
    this._message = value;
  }
  ngOnInit() {
    console.log("called")
  }


}
