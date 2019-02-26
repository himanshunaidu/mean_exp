import { Component, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import {Subscription} from 'rxjs';

import {User} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  userinput: User = null;
  userservice: UserService;
  usersub: Subscription;

  constructor(userservice: UserService) {
    this.userservice = userservice;
   }

  ngOnInit() {
    this.userinput = this.userservice.getUser();
    this.usersub = this.userservice.getUserNewListener()
      .subscribe((newuser) => {
        this.userinput = newuser;
        console.log(this.userinput);
      });
  }

  ngOnDestroy() {
    this.usersub.unsubscribe();
  }

}
