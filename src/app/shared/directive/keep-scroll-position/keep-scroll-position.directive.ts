import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {fromEvent} from 'rxjs';
import {debounceTime, distinct, filter, map} from 'rxjs/operators';

@Directive({
  selector: '[appKeepScrollPosition]'
})
export class KeepScrollPositionDirective implements AfterViewInit {
  y = 0;
  x = 0;

  constructor(private el: ElementRef, private router: Router) {
  }

  ngAfterViewInit(): void {
    fromEvent(this.el.nativeElement, 'scroll').pipe(
      map(({target}) => {
        return {x: target.scrollLeft, y: target.scrollTop};
      }),
      debounceTime(200),
      distinct(),
    ).subscribe(({x, y}) => {
      this.x = x;
      this.y = y;
    });
    this.router.events.pipe(
      filter(event => {
        return event instanceof NavigationEnd;
      })
    ).subscribe(_ => {
      const {nativeElement} = this.el;
      nativeElement.scrollLeft = this.x;
      nativeElement.scrollTop = this.y;
    });
  }

}
