import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import * as Quill from 'quill';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {animate, state, style, transition, trigger} from "@angular/animations";

const RICH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichEditorComponent),
  multi: true
};

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss'],
  providers: [RICH_VALUE_ACCESSOR],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        zIndex: 2020,
      })),
      state('closed', style({
        opacity: 0,
        zIndex: -2020
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('.2s')
      ]),
    ]),
  ]
})
export class RichEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('container', {static: true}) container;
  @ViewChild('toolbar', {static: true}) toolbar;
  @Input('height') height = '200px';
  @Input('scrollingContainer') scrollingContainer = null;
  @Input('placeholder') placeholder = '';
  onChange: (s: string) => void = null;
  editor: any = null;
  showImageTool = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    // https://blog.csdn.net/qq_27626333/article/details/81464100
    this.editor = new Quill(this.container.nativeElement, {
      modules: {
        toolbar: {
          container: this.toolbar.nativeElement,
          handlers: {
            image: () => this.showImageTool = true,
          }
        },
      },
      theme: 'snow',
      scrollingContainer: this.scrollingContainer,
      placeholder: this.placeholder,
    });
    this.editor.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        const content = this.editor.container.firstChild.innerHTML;
        if (this.onChange) {
          this.onChange(content);
        }
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (this.editor) {
      this.editor.setText(obj);
    }
  }
  handleImageChange(e) {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    e.target.value = '';
    const fd = new FileReader();
    fd.onload = (evt: any) => {
      const range = this.editor.getSelection();
      this.editor.insertEmbed(range.index, 'image', evt.target.result);
      this.showImageTool = false;
    };
    fd.readAsDataURL(file);
  }
  handleMaskClick(e) {
    if (e.target.classList.contains('rich-editor-mask')) {
      this.showImageTool = false;
    }
  }

}
