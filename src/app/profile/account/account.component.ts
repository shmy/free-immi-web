import {Component, OnInit} from '@angular/core';
import {DynamicModalService} from '../../shared/component/dynamic-modal/dynamic-modal.service';
import {AvatarCropperModalComponent} from '../../shared/modal/avatar-cropper-modal/avatar-cropper-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private dynamicModalService: DynamicModalService,
  ) {
  }

  ngOnInit() {
    this.dynamicModalService.open(AvatarCropperModalComponent, {});
  }

}
