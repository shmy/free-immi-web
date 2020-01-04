import {Component, Input, OnInit} from '@angular/core';
import timeagoJs from '../util/timeago.util';

@Component({
  selector: 'app-immi-post-item',
  templateUrl: './immi-post-item.component.html',
  styleUrls: ['./immi-post-item.component.scss']
})
export class ImmiPostItemComponent implements OnInit {
  @Input('title') title: string;
  @Input('avatar') avatar: string;
  @Input('nickname') nickname: string;
  @Input('updated_at') updated_at: string | number;
  @Input('last_reply_nickname') last_reply_nickname: string;
  @Input('reply_count') reply_count: number;
  constructor() { }
  get updatedAtText(): string {
    return timeagoJs(this.updated_at);
  }

  ngOnInit() {
  }

}
