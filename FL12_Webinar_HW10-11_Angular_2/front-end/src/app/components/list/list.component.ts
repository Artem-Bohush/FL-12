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

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .pipe(delay(500))
      .subscribe(() => {
        this.loading = false;
      });
  }

}
