import {Component, Input} from '@angular/core';
import {DynamicModalComponentExtended} from '../../component/dynamic-modal/dynamic-modal.component';
import {switchMap, tap} from 'rxjs/operators';
import {ProfileService} from '../../../profile/profile.service';
import {of} from 'rxjs';
import {PostService} from "../../../post/post.service";

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper-modal.component.html',
  styleUrls: ['./avatar-cropper-modal.component.scss']
})
export class AvatarCropperModalComponent extends DynamicModalComponentExtended {
  @Input('imageUrl') imageUrl = '';

  constructor(
    private postService: PostService,
    private profileService: ProfileService,
  ) {
    super();
  }

  handleCropped(dataURL: string) {
    of(1)
      .pipe(
      tap(() => {
        this.setBackgroundClickDismiss(false);
        this.setCloseVisible(false);
      }),
      switchMap(() => this.postService.uploadImageByDataURL(dataURL))
      // switchMap(() => {
      //   return this.profileService.setAvatar(dataURL);
      // })
    )
      .subscribe(([data, err]) => {
        this.setBackgroundClickDismiss(true);
        this.setCloseVisible(true);
        if (err) {
          err.showToast();
          return;
        }
        // console.log(data);
        this.close();
        this.profileService.refreshSelfInfo();
        // // @ts-ignore
        // if (ret.code === 200) {
        //  console.log(ret);
        // }
      });
  }
}
