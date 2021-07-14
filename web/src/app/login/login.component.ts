import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    this.userService.login(this.loginForm.value)
      .subscribe(data => {
        this.loading = false;
        this.userService.LoggedIn(data);
        this.router.navigate(["/home/dashboard"]);
      }, error => {
        this.loading = false;
        alert(error);
      });

  }

}
