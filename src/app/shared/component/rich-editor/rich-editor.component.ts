import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import * as Quill from 'quill';
import QuillImagePicker from './modules/image-picker';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
})
export class RichEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('container', {static: true}) container;
  @ViewChild('toolbar', {static: true}) toolbar;
  @Input('height') height = '200px';
  @Input('placeholder') placeholder = '';
  onChange: (s: string) => void = null;
  editor: any = null;

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
            image: QuillImagePicker,
            video: QuillImagePicker
          }
        },
      },
      theme: 'snow',
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
    // this.editor.customConfig.zIndex = 2019;
    // this.editor.customConfig.onchange = (html: string) => {
    //   if (this.onChange) {
    //     this.onChange(html);
    //   }
    // };
    // this.editor.create();
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

}
