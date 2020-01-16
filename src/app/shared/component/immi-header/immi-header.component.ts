import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../profile/profile.service';
import {getPlaceholderImage} from '../../util/viewerjs.util';
import {DomSanitizer} from "@angular/platform-browser";

console.log(getPlaceholderImage(200, 200))

@Component({
  selector: 'app-immi-header',
  templateUrl: './immi-header.component.html',
  styleUrls: ['./immi-header.component.scss']
})
export class ImmiHeaderComponent implements OnInit {
  defaultAvatar = this.sanitizer.bypassSecurityTrustUrl(getPlaceholderImage(200, 200));
  autocompleteIsHide = true;
  profilePopIsHide = true;

  constructor(
    public profileService: ProfileService,
    public sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    if (this.profileService.logged && !this.profileService.selfProfile) {
      this.profileService.refreshSelfInfo();
    }
  }

  handleClickOutside() {
    this.autocompleteIsHide = true;
  }

  handleProfileClickOutside() {
    this.profilePopIsHide = true;
  }

  handleLogout() {
    this.profileService.Logout();
    window.location.reload();
  }
}
