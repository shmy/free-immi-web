import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {emailValidator, equalValidator, passwordValidator, userNameValidator} from '../../shared/util/validator.util';
import {ToastrService} from 'ngx-toastr';
import {ProfileService} from "../profile.service";
import {of} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";

const DOMAINS = [
  'icloud.com',
  'gmail.com',
  'yahoo.com',
  'inbox.com',
  'outlook.com',
  'qq.com',
  '126.com',
  '163.com',
];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('usernameInput', {static: false}) usernameInput;
  @ViewChild('usernameRegisterInput', {static: false}) usernameRegisterInput;
  isLoginMode = true;
  loginFormGroup: FormGroup = this.fb.group({
    username: ['', [userNameValidator()]],
    password: ['', [passwordValidator()]],
  });
  registerFormGroup: FormGroup = this.fb.group({
    username: ['', [userNameValidator()]],
    email: ['', [emailValidator()]],
    password: ['', [passwordValidator()]],
    rePassword: ['', [passwordValidator()]],
  }, {
    validators: [equalValidator()]
  });
  submitting = false;
  autoCompletes = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    // this.loginFormGroup = this.fb.group({
    //   username: ['', [userNameValidator()]],
    //   password: ['', [passwordValidator()]],
    // });
    // this.registerFormGroup = this.fb.group({
    //   username: ['', [userNameValidator()]],
    //   email: ['', [emailValidator()]],
    //   password: ['', [passwordValidator()]],
    //   rePassword: ['', [passwordValidator()]],
    // }, {
    //   validators: [equalValidator()]
    // });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const value = this.loginFormGroup.value;
    of(1)
      .pipe(
        tap(() => {
          this.submitting = true;
          this.loginFormGroup.disable();
        }),
        switchMap(() => {
          return this.profileService.login(value.username, value.password);
        })
      )
      .subscribe(([data, err]) => {
        this.submitting = false;
        this.loginFormGroup.enable();
        if (err) {
          // this.toastrService.error(err.message, '登录失败');
          if (err) {
            err.showToast();
            return;
          }
          return;
        }
        // @ts-ignore
        this.profileService.setToken(data.jwtToken);
        this.router.navigateByUrl('/', {replaceUrl: true});
        this.toastrService.success('登录成功！');
      });
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    const value = this.registerFormGroup.value;
    of(1)
      .pipe(
        tap(() => {
          this.submitting = true;
          this.registerFormGroup.disable();
        }),
        switchMap(() => {
          return this.profileService.register(value.username, value.email, value.password, value.rePassword);
        })
      )
      .subscribe(([, err]) => {
        this.submitting = false;
        this.registerFormGroup.enable();
        if (err) {
          err.showToast();
          return;
        }
        this.toastrService.success('注册成功！请登录!');
        this.handleSwitchToLogin();
      });

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

  handleEmailInput(e) {
    let autoCompletes = [];
    const value = e.target.value.trim();
    if (!(!value || value.indexOf('@') !== -1)) {
      autoCompletes = DOMAINS.map(item => {
        return `${value}@${item}`;
      });
    }
    this.autoCompletes = autoCompletes;
  }

  handleSetAutocompleteEmail(email: string) {
    this.registerFormGroup.get('email').setValue(email);
    this.autoCompletes = [];
  }
}
