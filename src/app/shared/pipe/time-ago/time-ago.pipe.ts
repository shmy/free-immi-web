import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import TimeAgoUtil from './time-ago.util';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: number;
  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
  transform(value: any, ...args: any[]): any {
    this.removeTimer();
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, 1000 * 60);
      }
      return null;
    });
    return TimeAgoUtil(value);
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }
  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
