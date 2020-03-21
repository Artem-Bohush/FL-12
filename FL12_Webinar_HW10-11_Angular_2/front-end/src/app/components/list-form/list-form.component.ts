import { Component, OnInit } from '@angular/core';
import { UsersService, User } from 'src/app/shared/users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  searchInputControl = new FormControl('');

  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.searchInputControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((userName: string) => {
        if (userName.trim()) {
          this.usersService
            .searchUserByName(userName.trim())
            .subscribe((users: User[]) => {
              this.usersService.users = users;
            });
        } else {
          this.usersService.getUsers().subscribe();
        }
      });
  }

  addNewUser(): void {
    this.router.navigate(['users/new']);
  }
}
