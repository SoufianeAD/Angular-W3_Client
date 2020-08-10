import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User.models';
import {Subscription} from 'rxjs';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[] = [];
  usersSubscription: Subscription;

  constructor(public uSerService: UsersService) { }

  ngOnInit() {
    this.usersSubscription = this.uSerService.userSubject.subscribe(
        (users: User[]) => {
          this.users = users;
        }
    );
    this.uSerService.getAll();
  }


}
