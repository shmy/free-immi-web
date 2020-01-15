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
import {PostService} from '../../../post/post.service';
// import {baseUrl} from '../../http-interceptors/noop-interceptor';
import {CustomImageBlot} from './blot/custom-image.blot';
import {baseUrl} from '../../http-interceptors/noop-interceptor';

const FontStyle = Quill.import('attributors/style/font');
const SizeStyle = Quill.import('attributors/style/size');
FontStyle.whitelist = ['Arial', 'SimSun', 'SimHei', 'Microsoft YaHei', 'Kai', 'Hei'];
SizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];

Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);
// Quill.register('modules/focus', quillFocus);
// Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register(CustomImageBlot);
// Quill.register(
//   {
//     'formats/emoji': quillEmoji.EmojiBlot,
//     'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
//     // 'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
//     'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
//   },
//   true,
// );
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
            // emoji: () => {},
          }
        },
        // focus: {
        //   focusClass: 'focused-blot' // Defaults to .focused-blot.
        // },
        // blotFormatter: {},
        // 'emoji-toolbar': true,
        // 'emoji-textarea': true,
        // 'emoji-shortname': true,
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
        // this.editor.insertEmbed(range ? range.index : 0, 'image', baseUrl + data.imageUrl);
        // 自定义Tag
        this.editor.insertEmbed(range ? range.index : 0, 'immi-img', {
          src: baseUrl + data.imageUrl,
          id: data.imageId,
        });
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

  public getRichText() {
    const content = this.editor.container.firstChild.innerHTML;
    return this.richEditorCustomTransform.transform(content);
  }
}
