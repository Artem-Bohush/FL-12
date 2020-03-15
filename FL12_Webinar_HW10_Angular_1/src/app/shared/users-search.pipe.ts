import { Pipe, PipeTransform } from '@angular/core';
import { User } from './users.service';

@Pipe({
  name: 'usersSearch'
})
export class UsersSearchPipe implements PipeTransform {

  transform(users: User[], searchStr: string): User[] {
    return users.filter(user => {
      if (user.name.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) !== -1 ||
        user.email.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) !== -1) {
          return user;
      }
    });
  }
}
