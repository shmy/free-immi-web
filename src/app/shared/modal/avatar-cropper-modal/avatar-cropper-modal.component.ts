import { Component, OnInit } from '@angular/core';
import {DynamicModalComponentExtended} from '../../component/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper-modal.component.html',
  styleUrls: ['./avatar-cropper-modal.component.scss']
})
export class AvatarCropperModalComponent extends DynamicModalComponentExtended implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.setBackgroundClickDismiss(false);
    this.setCloseVisible(false);
  }

}
