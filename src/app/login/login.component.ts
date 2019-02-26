import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import {User} from '../user.model';
import {UserService} from '../user.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: boolean = false;
  userservice: UserService;

  // @Output() useremitter = new EventEmitter<User>();

  constructor(userservice: UserService) {
    this.userservice = userservice;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userservice.authUser(form.value.username, form.value.password);
    form.resetForm();

    /*this.users.forEach((user) => {
      // console.log(user.username);
      if (user.username === form.value.username) {
        if (user.password === form.value.password) {
          const user1 = Object.assign({}, user);
          this.useremitter.emit(user1);
          // console.log('Correct. Returning');
          this.auth = true;
          return;
        } else {
          console.log(user.username + ': Wrong password');
          return;
        }
      }
    });
    if (!this.auth) {
      this.useremitter.emit(null);
      console.log('Wrong username'); }*/
  }

  ngOnInit() {
  }

}
