import { Component, OnInit, Input, Pipe } from '@angular/core';
import { User, UsersService } from 'src/app/shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() user: User;

  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit(): void {}

  deleteUser() {
    this.usersService
      .deleteUser(this.user.id)
      .subscribe(() => {
        this.usersService
          .getUsers()
          .subscribe();
      });
  }

  showEditForm() {
    this.router.navigate(['users/', this.user.id]);
  }
}
