import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_model/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  // currentUser$<User>;
  constructor( public accountService:AccountService) { }

  ngOnInit(): void {

    }
  
  login(){
    this.accountService.login(this.model).subscribe(res=>{
      console.log(res);
    },error =>{
      console.log(error);
    });
 
  }

  logout(){
    this.accountService.logout();
  }
}
