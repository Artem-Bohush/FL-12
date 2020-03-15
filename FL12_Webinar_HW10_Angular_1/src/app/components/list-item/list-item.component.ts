import { Component, OnInit, Input, Pipe } from '@angular/core';
import { User, UsersService } from 'src/app/shared/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() user: User;

  private name: string;
  private email: string;
  private phone: string;

  editedUserData: User;
  editForm: boolean;
  invalidUserData: boolean;

  userDataForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
  });

  constructor(public _usersService: UsersService) { }

  ngOnInit(): void {
    this.name = this.user.name;
    this.email = this.user.email;
    this.phone = this.user.phone;

    if (this.user.name === '') {
      this.showEditForm();
      this.invalidUserData = true;
    } else {
      this.editForm = false;
      this.invalidUserData = false;
    }
  }

  deleteUser() {
    this._usersService.deleteUser(this.user.id);
  }

  showEditForm() {
    this.userDataForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, Validators.required),
    });
    this.userDataForm.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.invalidUserData = true;
      } else {
        this.invalidUserData = false;
      }
    });
    this.editForm = true;
  }

  discardEditing() {
    if (this.user.name === '' && this.user.email === '' && this.user.phone === '') {
      this._usersService.deleteUser(this.user.id);
    }

    this.editForm = false;
    this.invalidUserData = false;
  }

  saveEditedUserData() {
    this.editedUserData = {
      id: this.user.id,
      name: this.name,
      email: this.email,
      phone: this.phone
    };
    this._usersService.editUser(this.editedUserData);
    this.editForm = false;
  }

  inputtingNewName(newName: string) {
    this.name = newName;
  }

  inputtingNewEmail(newEmail: string) {
    this.email = newEmail;
  }

  inputtingNewPhone(newPhone: string) {
    this.phone = newPhone;
  }
}
