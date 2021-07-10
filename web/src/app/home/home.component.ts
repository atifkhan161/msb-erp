import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelloService } from '../service/hello.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HelloService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string = 'static';

  constructor(
    private router: Router,
    private helloService: HelloService,) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.getMessage();
  }

  getMessage(): void {
    this.helloService.getMessage()
      .subscribe(msg => (this.message = msg.message));
  }
}
