import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean =false;
  users:any ;
  constructor(private http:HttpClient,
    private accountService:AccountService) { }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){

    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
      console.log(this.users);
    },
    error =>{
      console.log(error);
      });
  }

  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
   }


}
