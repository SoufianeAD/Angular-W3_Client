import { Injectable } from '@angular/core';
import {User} from '../models/User.models';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];
  userSubject = new Subject<User[]>();

  constructor(private http: HttpClient) { }

  emitUsersubject() {
    this.userSubject.next(this.users);
  }

  getAll() {
    this.http.get(environment.apiURL + 'users').subscribe(
        (users: User[]) => {
          this.users = users;
          this.emitUsersubject();
        }, (error) => {
          console.log('Error getAll users : ' + error);
        }
    );
  }

  post(user: User) {
    return this.http.post(environment.apiURL + 'users', user);
  }

  findByEmail(email: string) {
      return this.users.find(u => u.email === email);
  }
}
