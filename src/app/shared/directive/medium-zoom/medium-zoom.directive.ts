import {AfterViewInit, Directive, ElementRef, HostBinding, Input} from '@angular/core';
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
    nativeElement.style.cursor = 'zoom-in';
    nativeElement.src = this.src;
    nativeElement.addEventListener('click', () => {
      nativeElement.style.visibility = 'hidden';
      const {top: originTop, left: originLeft, width: originWidth, height: originHeight} = nativeElement.getBoundingClientRect();
      const originCssText = `width: ${originWidth}px; height: ${originHeight}px; left: ${originLeft}px; top: ${originTop}px; transform: scale3d(1, 1, 1);`;
      const maskContainer = document.createElement('div');
      maskContainer.className = 'medium-zoom-mask';
      const imgElement = document.createElement('img');
      imgElement.style.cssText = originCssText;
      imgElement.className = 'medium-zoom-image';
      maskContainer.appendChild(imgElement);
      maskContainer.addEventListener('click', () => {
        maskContainer.addEventListener('transitionend', () => {
          try {
            nativeElement.style.visibility = 'visible';
            document.body.removeChild(maskContainer);
          } catch (e) {
            //
          }
        });
        imgElement.style.cssText = originCssText;
        maskContainer.style.backgroundColor = 'transparent';
      });
      document.body.appendChild(maskContainer);

      const img = new Image();
      img.src = this.src;
      img.onload = () => {
        const {width, height} = img;
        imgElement.src = this.src;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const dx = width / originWidth;
        const dy = height / originHeight;
        // https://www.cnblogs.com/chen8840/p/8528873.html
        // tslint:disable-next-line:no-unused-expression
        window.getComputedStyle(imgElement).transform;
        // 计算缩放后 居中配置
        const offsetTranslateXDist = width > windowWidth ? `${width / 2 - originWidth / 2}px` : '-50%';
        const offsetTranslateYDist = height > windowHeight ? `${height / 2 - originHeight / 2}px` : '-50%';
        const offsetLeftDist = width > windowWidth ? '0px' : '50%';
        const offsetTopDist = height > windowHeight ? '0px' : '50%';
        maskContainer.style.backgroundColor = 'rgba(0, 0, 0, .8)';
        imgElement.style.transform = `translate3d(${offsetTranslateXDist}, ${offsetTranslateYDist}, 0px) scale3d(${dx}, ${dy}, 1)`;
        imgElement.style.left = offsetLeftDist;
        imgElement.style.top = offsetTopDist;
      };
    }, false);
  }

}
