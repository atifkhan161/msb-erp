import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { User } from '../model/user.model';
import { ToastService } from '../service/toast-service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  _authenticated: boolean = false;
  _opened: boolean = true;
  _docked: boolean = true;
  user?: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }

  logOut() {
    this.userService.LogOut();
    this.router.navigate(["login"]);
  }

  changePassword() {
  this.modalService.open(ChangePasswordComponent).result.then(() => {
      this.toastService.success("Password changed successfully");
    });
  }
}
