import {Injectable} from '@angular/core';
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() {
  }

  public login(username, password: string) {
    return fromPromise(new Promise(resolve => {
      setTimeout(() => {
        resolve({
          token: 'token_string'
        });
      }, 3000);
    }));
  }

  public setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  public getToken(): string {
    return window.localStorage.getItem('token');
  }

  public Logout() {
    this.clearToken();
  }

  public clearToken() {
    window.localStorage.removeItem('token');
  }

  public register(username, email, password, rePassword: string) {

  }

  public setAvatar(dataURL: string) {
    return fromPromise(new Promise(resolve => {
      setTimeout(() => {
        resolve({dataURL});
      }, 1000);
    }));
  }
}
