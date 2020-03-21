import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, User } from 'src/app/shared/users.service';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnInit {

  user: User;
  formTitle = '';
  isNewUserForm: boolean;

  userName = '';
  userEmail = '';
  userPhone = '';
  userAddress = '';
  userWebsite = '';

  invalidName: boolean;
  invalidEmail: boolean;
  invalidPhone: boolean;

  userDataForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    address: new FormControl(''),
    website: new FormControl('')
  });

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id === 'new') {
      this.formTitle = 'New User';
      this.isNewUserForm = true;
      this.invalidName = true;
      this.invalidEmail = true;
      this.invalidPhone = true;
    } else {
      this.formTitle = 'Edit User';
      this.isNewUserForm = false;
      this.invalidName = false;
      this.invalidEmail = false;
      this.invalidPhone = false;

      this.usersService
        .getUserById(this.route.snapshot.params.id)
        .subscribe((user: User) => {
          this.user = user;
          this.userDataForm.setValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address.street,
            website: user.website
          });
          this.userName = user.name;
          this.userEmail = user.email;
          this.userPhone = user.phone;
          this.userAddress = user.address.street;
          this.userWebsite = user.website;
        });
    }
    this.userDataForm.controls.name.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.invalidName = true;
      } else {
        this.invalidName = false;
      }
    });
    this.userDataForm.controls.email.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.invalidEmail = true;
      } else {
        this.invalidEmail = false;
      }
    });
    this.userDataForm.controls.phone.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.invalidPhone = true;
      } else {
        this.invalidPhone = false;
      }
    });
  }

  inputtingUserData(input) {
    if (input.name === 'name') {
      this.userName = input.value;
    } else if (input.name === 'email') {
      this.userEmail = input.value;
    } else if (input.name === 'phone') {
      this.userPhone = input.value;
    } else if (input.name === 'address') {
      this.userAddress = input.value;
    } else {
      this.userWebsite = input.value;
    }
  }

  goBack() {
    this.router.navigate(['users']);
  }

  save() {
    if (this.isNewUserForm) {
      this.usersService
        .addUser(this.userName, this.userEmail, this.userPhone, this.userAddress, this.userWebsite)
        .subscribe(() => {
          this.router.navigate(['users']);
        });
    } else {
      this.usersService
        .editUser(this.route.snapshot.params.id, this.userName,
          this.userEmail, this.userPhone, this.userAddress, this.userWebsite)
        .subscribe(() => {
          this.router.navigate(['users']);
        });
    }
  }

  discard() {
    if (this.isNewUserForm) {
      this.userDataForm.setValue({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: ''
      });
      this.invalidName = true;
      this.invalidEmail = true;
      this.invalidPhone = true;
    } else {
      this.userDataForm.setValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address.street,
        website: this.user.website
      });
      this.invalidName = false;
      this.invalidEmail = false;
      this.invalidPhone = false;
    }
  }
}
