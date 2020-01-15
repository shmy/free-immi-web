import {Component, OnInit} from '@angular/core';
import {DynamicModalService} from '../../shared/component/dynamic-modal/dynamic-modal.service';
import {AvatarCropperModalComponent} from '../../shared/modal/avatar-cropper-modal/avatar-cropper-modal.component';
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private dynamicModalService: DynamicModalService,
    public profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    // this.dynamicModalService.open(AvatarCropperModalComponent, {});
  }

  handleFileChange(e) {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    e.target.value = '';
    const fr = new FileReader();
    fr.onload = (evt: any) => {
      this.dynamicModalService.open(AvatarCropperModalComponent, {
        imageUrl: evt.target.result
      });
      // console.log(evt.target.result);
    };
    fr.readAsDataURL(file);

  }

}
