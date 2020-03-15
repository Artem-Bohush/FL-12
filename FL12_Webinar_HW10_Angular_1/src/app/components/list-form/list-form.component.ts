import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  constructor(public _usersService: UsersService) { }

  ngOnInit(): void {
  }

  searchUser(str: string): void {
    this._usersService.searchStr = str.trim();
  }

  addNewUser(): void {
    this._usersService.addUser();
  }
}
