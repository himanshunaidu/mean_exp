import {User} from './user.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  authuser: User = null;
  authnewuser = new Subject<User>();
  httpclient: HttpClient;
  /*users: User[] = [
    {_id: '123', username: 'Himanshu', password: 'neutral', content: 'Loves to stay neutral'},
    {_id: '124', username: 'Goku', password: 'paragon', content: 'Loves to be a good example'},
    {_id: '125', username: 'Vegeta', password: 'renegade', content: 'Loves to rebel'}
  ];*/

  constructor(httpclient: HttpClient){
    this.httpclient = httpclient;
  }


  authUser(u: string, p: string) {
    const userparams = {
      params: {
        username: u,
        password: p
      }
    };
    this.httpclient.get<{status: number, user: User}>('http://localhost:3000/users', userparams)
      .subscribe((userData) => {
        if (userData.status === 0) {
          this.authuser = userData.user;
          this.authnewuser.next(Object.assign({}, this.authuser));
        } else {
          this.authuser = null;
          this.authnewuser.next(null);
        }
      });
  }

  // Front-end authentication
  /*authUser(username: string, password: string) {
    //this.getUsers();
    let usercheck: boolean = false;
    this.users.forEach((user) => {
      // console.log(user.username);
      if (user.username === username) {
        if (user.password === password) {
          const user1 = Object.assign({}, user);
          this.authuser = user1;
          this.authnewuser.next(Object.assign({}, this.authuser));
        } else {
          this.authuser = null;
          this.authnewuser.next(null);
          alert(username + ': Wrong password');
        }
        usercheck = true;
        return;
      }
    });
    if (!usercheck) {
      this.authuser = null;
      this.authnewuser.next(null);
      alert(username + ': Wrong username');
    }
  }*/

  getUser() {
    return this.authuser;
  }

  getUserNewListener(){
    return this.authnewuser.asObservable();
  }
}
