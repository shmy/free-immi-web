import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-immi-header',
  templateUrl: './immi-header.component.html',
  styleUrls: ['./immi-header.component.scss']
})
export class ImmiHeaderComponent implements OnInit {
  autocompleteIsHide = true;
  profilePopIsHide = true;
  constructor() { }

  ngOnInit() {
  }
  handleClickOutside() {
    this.autocompleteIsHide = true;
  }
  handleProfileClickOutside() {
    this.profilePopIsHide = true;
    console.log('handleProfileClickOutside')
  }
}
