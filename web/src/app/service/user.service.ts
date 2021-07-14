import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  configUrl = 'http://localhost:8087/user';

  /**
   * Subject to store loggedin user info.
   */
  private loggedInUser = new Subject<User>();
  private loggedIn = false;

  getLoggedInUser(): Observable<any> {
    return this.loggedInUser.asObservable();
  }

  login(user: User) {
    return this.http
      .post<User>(this.configUrl + "/login", user);
  }

  isLoggedIn(): boolean {
   return this.loggedIn;
  }
  LoggedIn(user: User): void {
    this.loggedIn = true;
    this.loggedInUser.next(user);
  }
}