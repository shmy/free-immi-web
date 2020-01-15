import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarCropperModalComponent} from './avatar-cropper-modal.component';
import {ImmiCropperModule} from "../../component/immi-cropper/immi-cropper.module";


@NgModule({
  declarations: [AvatarCropperModalComponent],
  imports: [
    CommonModule,
    ImmiCropperModule
  ],
  exports: [AvatarCropperModalComponent],
  entryComponents: [AvatarCropperModalComponent]
})
export class AvatarCropperModalModule {
}
