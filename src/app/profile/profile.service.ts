import {Injectable} from '@angular/core';
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() {
  }

  public setAvatarService(dataURL: string) {
    return fromPromise(new Promise(resolve => {
      setTimeout(() => {
        resolve({dataURL});
      }, 1000);
    }));
  }
}
