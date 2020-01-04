import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit, OnDestroy {

  constructor() {
  }

  $scroll: Subscription = null;
  showBackTop = false;

  ngOnInit() {
    this.bind();
  }

  handleBackTop() {
    document.documentElement.scrollTo({left: 0, top: 0});
  }

  bind() {
    this.$scroll = fromEvent(window, 'scroll')
      .pipe(
        debounce(() => timer(300)),
        tap(() => {
          const scrollTop = document.documentElement.scrollTop;
          this.showBackTop = scrollTop > 60;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.$scroll) {
      this.$scroll.unsubscribe();
    }
  }
}
