import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string = 'static';
  _authenticated: boolean = false;
  _opened: boolean = true;
  _docked: boolean = true;
  constructor(
    private router: Router,) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.getMessage();
  }

  getMessage(): void {
    this.message = "updated!";
  }
}
