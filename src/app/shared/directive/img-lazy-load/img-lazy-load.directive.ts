import {AfterViewInit, Directive, ElementRef, HostBinding, Input} from '@angular/core';

@Directive({
  selector: 'img[appImgLazyLoad]'
})
export class ImgLazyLoadDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;
  @Input() loadingPlaceholder = 'assets/images/loading.png';
  @Input() errorPlaceholder = 'assets/images/error.png';
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    const img = new Image();
    // @ts-ignore
    img.onload = img.onerror = ({ type }) => {
      this.srcAttr = type === 'load' ? this.src : this.errorPlaceholder;
    };
    img.src = this.src;
    this.srcAttr = this.loadingPlaceholder;
  }
}
