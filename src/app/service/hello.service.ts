import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hello } from '../model/hello.model';

@Injectable()
export class HelloService {
  constructor(private http: HttpClient) { }
  configUrl = 'http://localhost:8787/hello';

  getMessage() {
    return this.http.get<Hello>(this.configUrl);
  }
}