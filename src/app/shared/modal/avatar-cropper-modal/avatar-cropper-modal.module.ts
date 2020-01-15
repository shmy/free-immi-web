import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarCropperModalComponent} from './avatar-cropper-modal.component';


@NgModule({
  declarations: [AvatarCropperModalComponent],
  imports: [
    CommonModule
  ],
  exports: [AvatarCropperModalComponent],
  entryComponents: [AvatarCropperModalComponent]
})
export class AvatarCropperModalModule {
}
