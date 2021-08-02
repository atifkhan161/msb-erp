import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  user!: User;
  constructor(
    private service: UserService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPwd: new FormControl('', Validators.required),
      newPwd: new FormControl('', Validators.required),
      confirmPwd: new FormControl('', Validators.required),
    });
    this.passwordForm.setValidators(this.matchPwds);
  }
  onSubmit() {
    this.service.changePassword(this.passwordForm.value).subscribe(user => {
      this.activeModal.close();
    });
  }

  get confirmPwd() {
    return this.passwordForm.get('confirmPwd');
  }

  get oldPwd() {
    return this.passwordForm.get('oldPwd')!;
  }

  get newPwd() {
    return this.passwordForm.get('newPwd')!;
  }

  matchPwds(control: AbstractControl) {
    let newPwd2 = control.get('newPwd');
    let confirmPwd2 = control.get('confirmPwd');
    if (newPwd2?.value !== confirmPwd2?.value) {
      return { pwdsDontMatch: true };
    }
    return null;
  }
}