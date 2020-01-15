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
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {RichEditorCustomTransform} from './rich-editor-custom.transform';
import * as quillFocus from 'quill-focus';
import BlotFormatter from 'quill-blot-formatter';
import quillEmoji from 'quill-emoji';
import {PostService} from "../../../post/post.service";
import {baseUrl} from "../../http-interceptors/noop-interceptor";

const FontStyle = Quill.import('attributors/style/font');
const SizeStyle = Quill.import('attributors/style/size');
FontStyle.whitelist = ['Arial', 'SimSun', 'SimHei', 'Microsoft YaHei', 'Kai', 'Hei'];
SizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];

Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);
Quill.register('modules/focus', quillFocus);
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register(
  {
    'formats/emoji': quillEmoji.EmojiBlot,
    'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
    // 'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
    'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
  },
  true,
);
const RICH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichEditorComponent),
  multi: true
};

// const IMAGE_API_URL = 'https://imgkr.com/api/files/upload';

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
  @Input('stickyTop') stickyTop = '0';
  @Input('scrollingContainer') scrollingContainer = null;
  @Input('placeholder') placeholder = '';
  onChange: (s: string) => void = null;
  editor: any = null;
  showImageTool = false;
  imageLoading = false;

  constructor(
    private httpClient: HttpClient,
    private postService: PostService,
    private richEditorCustomTransform: RichEditorCustomTransform,
  ) {
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
            emoji: () => {
            },
          }
        },
        focus: {
          focusClass: 'focused-blot' // Defaults to .focused-blot.
        },
        blotFormatter: {},
        'emoji-toolbar': true,
        // 'emoji-textarea': true,
        'emoji-shortname': true,
      },
      theme: 'snow',
      scrollingContainer: this.scrollingContainer,
      placeholder: this.placeholder,
    });
    this.editor.on('text-change', (delta, oldDelta, source) => {
      const content = this.editor.container.firstChild.innerHTML;
      if (this.onChange) {
        this.onChange(content);
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
      this.editor.clipboard.dangerouslyPasteHTML(0, obj);
      // this.editor.setText(obj);
    }
  }

  handleImageChange(e) {
    this.imageLoading = true;
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    e.target.value = '';
    this.postService.uploadImageByFile(file)
      .subscribe(([data, err]) => {
        if (err) {
          err.showToast();
          return;
        }
        const range = this.editor.getSelection();
        this.editor.insertEmbed(range ? range.index : 0, 'image', baseUrl + data.imageUrl);
        this.showImageTool = false;
        this.imageLoading = false;
      });

  }

  handleMaskClick(e) {
    if (this.imageLoading) {
      return;
    }
    if (e.target.classList.contains('rich-editor-mask')) {
      this.showImageTool = false;
    }
  }

  private getRichText() {
    const content = this.editor.container.firstChild.innerHTML;
    return this.richEditorCustomTransform.transform(content);
  }

  // private test() {
  //   const data = `<p>dsadsadsadsadasd<img src="https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png"></p><p><img src="https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png" /><br></p><p><br></p><p><img src="https://imgkr.cn-bj.ufileos.com/852d9c4a-1340-458a-b05a-ddd3351b12b2.jpg"></p><p><img src="https://imgkr.cn-bj.ufileos.com/694abf7a-6bf2-4f6f-8bec-59b86e286086.jpg"></p><p><br></p>
  //   <p><img src="https://tpc.googlesyndication.com/simgad/10949952014676677817" /></p><p><br></p><p><br></p>
  //   <p>&lt;img src="https://tpc.googlesyndication.com/simgad/10949952014676677817" /&gt;</p><p><br></p><p><br></p>
  //   <p><strong style="font-size: 14px;">ds</strong><span style="font-size: 14px;">ad</span><span style="font-size: 14px; font-family: Hei;">asdadafds</span></p><p>fsd<span style="font-size: 20px; color: rgb(240, 102, 102);">d</span></p><p><span style="font-size: 20px; color: rgb(240, 102, 102);">fds</span><s style="font-size: 20px; color: rgb(240, 102, 102);">fdsf</s></p><p><br></p><p>&lt;img src="https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png"&gt;</p><p><br></p>
  // `;
  //   const d = this.richEditorCustomTransform.transform(data);
  //   console.log(d);
  //   console.log(this.richEditorCustomTransform.restore(d.content, d.urls));
  //   // const transformed = `
  //   // <p>dsadsadasd</p><p>dsa</p><p>dsa<img style="display: none" data-index="0"></p><p><img style="display: none" data-index="1"></p><p><img style="display: none" data-index="2"></p><p><img style="display: none" data-index="3"></p><p><img style="display: none" data-index="4"></p><p><img style="display: none" data-index="5"></p><p><img style="display: none" data-index="6"></p><p><img style="display: none" data-index="7"></p><p><img style="display: none" data-index="8"></p><p><img style="display: none" data-index="9"></p><p><img style="display: none" data-index="10"></p><p><img style="display: none" data-index="11"></p><p><img style="display: none" data-index="12"></p><p><img style="display: none" data-index="13"></p><p><img style="display: none" data-index="14"></p><p><img style="display: none" data-index="15"></p><p><img style="display: none" data-index="16"></p><p><img style="display: none" data-index="17"></p><p><img style="display: none" data-index="18"></p><p><br></p>
  //   // `;
  //   // console.log(this.richEditorCustomTransform.restore(transformed, [
  //   //   'http://localhost:4200/assets/logo.png',
  //   //   'http://localhost:4200/assets/logo.png',
  //   //   'http://localhost:4200/assets/logo.png',
  //   // ]));
  // }

}
