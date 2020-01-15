import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../profile/profile.service';

@Component({
  selector: 'app-immi-header',
  templateUrl: './immi-header.component.html',
  styleUrls: ['./immi-header.component.scss']
})
export class ImmiHeaderComponent implements OnInit {
  autocompleteIsHide = true;
  profilePopIsHide = true;

  constructor(
    private profileService: ProfileService,
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
