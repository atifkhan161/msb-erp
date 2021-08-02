import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  configUrl = 'http://localhost:8087/user';

  private loggedIn = false;
  private user?: User;

  getLoggedInUser(): User {
    return this.user!;
  }

  login(user: User) {
    return this.http
      .post<User>(this.configUrl + "/login", user);
  }

  changePassword(user: any) {
    user.username = this.user?.username;
    user.password = user.oldPwd;
    return this.http
      .post<User>(this.configUrl + "/change", user);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  LoggedIn(user: User): void {
    this.loggedIn = true;
    this.user = user;
  }

  LogOut() {
    this.loggedIn = false;
    this.user = undefined;
  }
}