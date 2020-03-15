import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading = true;

  constructor(public _usersService: UsersService) { }

  ngOnInit(): void {
    this._usersService.fetchUsers()
      .pipe(delay(1000))
      .subscribe(() => {
        this.loading = false;
      });
  }

}
