import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  Type
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DynamicModalComponent} from './dynamic-modal.component';

// https://github.com/fullstackio/awesome-fullstack-tutorials/blob/1345fa4304157bb0f54f6e35a99d336293f325cb/angular/dynamic-components-with-content-projection/dynamic-components-projection.md
export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: 'root'
})
export class DynamicModalService {
  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef,
              @Inject(DOCUMENT) private document: Document
  ) {
  }

  open<T>(content: Content<T>, data: any = {}) {
    const factory = this.resolver.resolveComponentFactory(DynamicModalComponent);
    const componentRef = factory.create(this.injector);
    componentRef.instance.componentRef = componentRef;
    componentRef.instance.dynamicComponent = content;
    componentRef.instance.data = data;
    componentRef.instance.modalDestroyHandler = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };
    this.appRef.attachView(componentRef.hostView);
    componentRef.hostView.detectChanges();
    const {nativeElement} = componentRef.location;
    this.document.body.appendChild(nativeElement);
  }

  resolveNgContent<T>(content: Content<T>) {
    if (typeof content === 'string') {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      // In earlier versions, you may need to add this line
      // this.appRef.attachView(viewRef);
      return [viewRef.rootNodes];
    }

    const factory = this.resolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    return [[componentRef.location.nativeElement]];
  }

}
