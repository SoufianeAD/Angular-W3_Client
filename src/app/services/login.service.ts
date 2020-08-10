import { Injectable } from '@angular/core';
import {UsersService} from './users.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public userService: UsersService,
              private router: Router) { }

  logIn(email: string, password: string) {
    this.userService.getAll();
    const user = this.userService.findByEmail(email);
    if (user !== undefined && user !== null) {
      localStorage.setItem('login', user.email);
      this.router.navigate(['/saisie-commande-fournisseur'])
    }
  }

  logOut() {
    localStorage.removeItem('login');
  }
}
