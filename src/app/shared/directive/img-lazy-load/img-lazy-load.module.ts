import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgLazyLoadDirective} from './img-lazy-load.directive';


@NgModule({
  declarations: [ImgLazyLoadDirective],
  imports: [
    CommonModule
  ],
  exports: [ImgLazyLoadDirective]
})
export class ImgLazyLoadModule {
}
