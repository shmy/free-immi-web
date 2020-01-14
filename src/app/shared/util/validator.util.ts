import {AbstractControl, ValidatorFn} from '@angular/forms';
export function userNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (!value) {
      return {message: '请输入用户名'};
    }
    if (value.length < 4) {
      return {message: '用户名不能小于4位'};
    }
    if (value.length > 20) {
      return {message: '用户名不能大于20位'};
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return {message: '用户名只能包含字母和数字'};
    }
    return null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (!value) {
      return {message: '请输入密码'};
    }
    if (value.length < 8) {
      return {message: '密码不能小于8位'};
    }
    if (value.length > 32) {
      return {message: '密码不能大于32位'};
    }
    return null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (!value) {
      return {message: '请输入邮箱'};
    }
    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
      return {message: '邮箱格式不正确'};
    }
    return null;
  };
}

export function equalValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const password = control.get('password').value;
    const rePassword = control.get('rePassword').value;
    if (rePassword !== password) {
      control.get('rePassword').setErrors({message: '两次密码输入不一致'});
    }
    return null;
  };
}
