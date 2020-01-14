import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailValidator, equalValidator, passwordValidator, userNameValidator} from '../../shared/util/validator.util';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('usernameInput', {static: false}) usernameInput;
  @ViewChild('usernameRegisterInput', {static: false}) usernameRegisterInput;
  isLoginMode = true;
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  submitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: ['', [userNameValidator()]],
      password: ['', [passwordValidator()]],
    });
    this.registerFormGroup = this.fb.group({
      username: ['', [userNameValidator()]],
      email: ['', [emailValidator()]],
      password: ['', [passwordValidator()]],
      rePassword: ['', [passwordValidator()]],
    }, {
      validators: [equalValidator()]
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    this.submitting = true;
    this.loginFormGroup.disable();
    console.log(this.loginFormGroup.value);
    setTimeout(() => {
      this.submitting = false;
      this.loginFormGroup.enable();
      this.toastrService.success('登陆成功！');
    }, 1000);
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    this.submitting = true;
    this.registerFormGroup.disable();
    console.log(this.registerFormGroup.value);
    setTimeout(() => {
      this.submitting = false;
      this.registerFormGroup.enable();
      this.toastrService.success('注册成功！请登陆！');
      this.handleSwitchToLogin();
    }, 1000);
  }

  handleSwitchToLogin() {
    this.loginFormGroup.reset();
    this.isLoginMode = true;
    setTimeout(() => {
      this.usernameInput.nativeElement.focus();
    }, 0);
  }

  handleSwitchToRegister() {
    this.registerFormGroup.reset();
    this.isLoginMode = false;
    setTimeout(() => {
      this.usernameRegisterInput.nativeElement.focus();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.handleSwitchToLogin();
  }
}
