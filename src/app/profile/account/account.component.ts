import { Component, OnInit } from '@angular/core';
import {DynamicModalService} from '../../shared/component/dynamic-modal/dynamic-modal.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private dynamicModalService: DynamicModalService
  ) { }

  ngOnInit() {
    this.dynamicModalService.open('dsada', {})
    this.dynamicModalService.open('dsada', {})
    this.dynamicModalService.open('dsada', {})
    this.dynamicModalService.open('dsada', {})
    this.dynamicModalService.open('dsada', {})
    this.dynamicModalService.open('dsada', {})
    this.dynamicModalService.open('dsada', {})
  }

}
