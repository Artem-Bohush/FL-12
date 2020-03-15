import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: User[] = [];
  public searchStr = '';

  private usersURL = 'https://jsonplaceholder.typicode.com/users?_limit=8';
  private usersCopy: User[];
  private newUserData: User;
  private idForNewUser: number;

  constructor(private _http: HttpClient) { }

  public fetchUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.usersURL)
      .pipe(tap(users => {
        this.users = users;
        this.idForNewUser = users.length + 1;
      }));
  }

  public addUser(): void {
    this.newUserData = {
      id: this.idForNewUser,
      name: '',
      email: '',
      phone: ''
    };
    this.usersCopy = this.users.slice();
    this.usersCopy.unshift(this.newUserData);
    this.users = this.usersCopy;
    this.idForNewUser += 1;
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  public editUser(editedUserData: User): void {
    this.users.forEach(user => {
      if (user.id === editedUserData.id) {
        user.name = editedUserData.name;
        user.email = editedUserData.email;
        user.phone = editedUserData.phone;
      }
    });
  }
}
