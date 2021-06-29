import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userFromHomeComponent:any;
  model:any ={};
  constructor() { }

  ngOnInit(): void {
    console.log(this.userFromHomeComponent);
    
  }

  register(){
    console.log(this.model);
    
  }

  cancel(){
    console.log("cancel");

  }

}
