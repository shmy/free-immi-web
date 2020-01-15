import {Component, Input} from '@angular/core';
import {DynamicModalComponentExtended} from '../../component/dynamic-modal/dynamic-modal.component';
import {switchMap, tap} from 'rxjs/operators';
import {ProfileService} from '../../../profile/profile.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper-modal.component.html',
  styleUrls: ['./avatar-cropper-modal.component.scss']
})
export class AvatarCropperModalComponent extends DynamicModalComponentExtended {
  @Input('imageUrl') imageUrl = '';

  constructor(
    private profileService: ProfileService,
  ) {
    super();
  }

  handleCropped(dataURL: string) {
    of(1).pipe(
      tap(() => {
        this.setBackgroundClickDismiss(false);
        this.setCloseVisible(false);
      }),
      switchMap(() => {
        return this.profileService.setAvatar(dataURL);
      })
    )
      .subscribe(ret => {
        console.log(ret);
        this.setBackgroundClickDismiss(true);
        this.setCloseVisible(true);
        this.close();
        // // @ts-ignore
        // if (ret.code === 200) {
        //  console.log(ret);
        // }
      });
  }
}
