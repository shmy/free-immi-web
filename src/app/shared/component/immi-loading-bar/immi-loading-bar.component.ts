import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-immi-loading-bar',
  templateUrl: './immi-loading-bar.component.html',
  styleUrls: ['./immi-loading-bar.component.scss']
})
export class ImmiLoadingBarComponent implements OnInit, OnChanges {
  // 延迟时间再显示 避免闪烁
  @Input('visible') visible = false;
  @Input('delay') delay = 300;
  show = false;
  timer: number;
  constructor() { }

  ngOnInit() {

  }
  private clearTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.clearTimer();
    if (changes.visible.currentValue) {
      this.timer = setTimeout(() => {
        this.show = true;
      }, this.delay);
    } else {
      this.show = false;
    }
  }

}
