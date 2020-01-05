import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription, timer} from "rxjs";
import {debounce, tap} from "rxjs/operators";

@Component({
  selector: 'app-immi-back-top',
  templateUrl: './immi-back-top.component.html',
  styleUrls: ['./immi-back-top.component.scss']
})
export class ImmiBackTopComponent implements OnDestroy, AfterViewInit {
  $scroll: Subscription = null;
  showBackTop = false;
  @Input('scrollContainer') scrollContainer;
  constructor() { }
  ngAfterViewInit(): void {
    this.bind();
  }

  bind() {
    this.$scroll = fromEvent(this.scrollContainer, 'scroll')
      .pipe(
        debounce(() => timer(300)),
        tap(() => {
          const scrollTop = this.scrollContainer.scrollTop;
          this.showBackTop = scrollTop > 60;
        })
      )
      .subscribe();
  }

  handleBackTop() {
    this.scrollContainer.scrollTo({left: 0, top: 0});
  }
  ngOnDestroy(): void {
    if (this.$scroll) {
      this.$scroll.unsubscribe();
    }
  }
}
