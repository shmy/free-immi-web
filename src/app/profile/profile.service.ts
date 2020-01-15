import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {HttpClient} from '@angular/common/http';
import {HasHttpResponseCustomError} from '../shared/http-interceptors/noop-interceptor';

interface ISelfProfile {
  username: string;
  nickname: string;
  avatar: string;
  signature: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public selfProfile: ISelfProfile;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public get logged(): boolean {
    return !!this.getToken();
  }

  public login(username, password: string) {
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/account/login', {username, password});
  }

  public register(username, email, password, rePassword: string) {
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/account/register', {username, email, password});
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

  public refreshSelfInfo() {
    fromPromise(new Promise(resolve => {
      setTimeout(() => {
        resolve({
          username: 'shmy',
          nickname: '李媛媛',
          avatar: 'https://avatars3.githubusercontent.com/u/19339440',
          signature: '生活不止眼前的苟且，还有诗和远方。'
        });
      }, 1000);
    })).subscribe((evt: any) => {
      console.log(evt);
      this.selfProfile = evt;
    });
  }

  public setAvatar(dataURL: string) {
    return fromPromise(new Promise(resolve => {
      setTimeout(() => {
        resolve({dataURL});
      }, 1000);
    }));
  }
}
