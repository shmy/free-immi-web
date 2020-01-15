import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver, Directive,
  Input,
  ViewChild, ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appInsertion]'
})
export class InsertionDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent implements AfterViewInit {
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
  ) {
  }

  @ViewChild(InsertionDirective, {static: false}) insertionPoint: InsertionDirective;
  @ViewChild('maskElement', {static: true}) maskElement;
  @ViewChild('containerElement', {static: true}) containerElement;
  @Input() dynamicComponent: any;
  @Input() componentRef: any;
  @Input() props: {[s: string]: any} = {};
  @Input() modalDestroyHandler: () => void;
  backgroundClickDismiss = true;
  closeVisible = true;

  handleMaskClick(e) {
    if (e.currentTarget === e.target && this.backgroundClickDismiss) {
      this.close();
    }
  }

  close() {
    this.maskElement.nativeElement.addEventListener('transitionend', () => {
      try {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.modalDestroyHandler();
      } catch (e) {
        console.warn(e);
        //
      }
    });
    this.maskElement.nativeElement.style.opacity = '0';
    this.containerElement.nativeElement.style.opacity = '0';
    this.containerElement.nativeElement.style.marginTop = '100px';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const componentFactory = this.resolver.resolveComponentFactory(this.dynamicComponent);
      const viewContainerRef = this.insertionPoint.viewContainerRef;
      viewContainerRef.clear();
      const cf = viewContainerRef.createComponent(componentFactory) as any;
      Object.keys(this.props).forEach((key: string) => {
        cf.instance[key] = this.props[key];
      });
      cf.instance.close = () => this.close();
      cf.instance.setBackgroundClickDismiss = (v: boolean) => {
        this.backgroundClickDismiss = v;
      };
      cf.instance.setCloseVisible = (v: boolean) => {
        this.closeVisible = v;
      };
      // tslint:disable-next-line:no-unused-expression
      window.getComputedStyle(this.maskElement.nativeElement).transform;
      this.maskElement.nativeElement.style.opacity = '1';
      this.containerElement.nativeElement.style.opacity = '1';
      this.containerElement.nativeElement.style.marginTop = '0';
    }, 0);
  }
}


export class DynamicModalComponentExtended {
  data: any;

  close() {
  }

  setBackgroundClickDismiss(v: boolean) {
  }

  setCloseVisible(v: boolean) {
  }
}
