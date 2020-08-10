import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User.models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(public userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const user = new User();
    user.email = this.userForm.get('email').value;
    user.password = this.userForm.get('password').value;
    this.userService.post(user).subscribe(
        (u: User) => {
          console.log('Add user ok : ' + u);
          this.router.navigate(['/list-user'])
        }, (error) => {
          console.log('Add user Error : ' + error);
        }
    );
  }
}
