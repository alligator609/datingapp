import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  loggedIn:boolean =false;
  // currentUser$<User>;
  constructor( private accountService:AccountService) { }

  ngOnInit(): void {

    this.getCurrentUser();
  }
  
  login(){
    this.accountService.login(this.model).subscribe(res=>{
      console.log(res);
      this.loggedIn= true;
    },error =>{
      console.log(error);
    });
 
  }

  logout(){
    this.accountService.logout();
    this.loggedIn= false;
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user=>{
      this.loggedIn = !!user; // object to bolean 
    },error=>{
      console.log(error);
      
    })
  }
}
