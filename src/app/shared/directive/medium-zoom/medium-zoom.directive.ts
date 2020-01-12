import {AfterViewInit, Directive, ElementRef, HostBinding, Input} from '@angular/core';
import mediumZoom from './medium-zoom';
import './medium-zoom.scss';
@Directive({
  selector: '[appMediumZoom]',

})
export class MediumZoomDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    const {nativeElement} = this.el;
    mediumZoom(nativeElement, this.src);
  }

}
