import {Component, OnInit, ViewChild} from '@angular/core';
import viewerjs from '../../shared/util/viewerjs.util';
import {RichEditorCustomTransform} from '../../shared/component/rich-editor/rich-editor-custom.transform';

@Component({
  selector: 'app-detail',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  content = '';
  comment = '';
  @ViewChild('contentContainer', {static: true}) contentContainer;
  @ViewChild('container', {static: true}) container;

  constructor(
    private richEditorCustomTransform: RichEditorCustomTransform,
  ) {
  }

  ngOnInit() {
    const content = `
      <p>dsadsadsadsadasd<img style="display: none" data-index="0"></p><p><img style="display: none" data-index="1"><br></p><p><br></p><p><img style="display: none" data-index="2"></p><p><img style="display: none" data-index="3"></p><p><br></p>
      <p><img style="display: none" data-index="4"></p><p><br></p><p><br></p>
      <p>&lt;img src="https://tpc.googlesyndication.com/simgad/10949952014676677817" /&gt;</p><p><br></p><p><br></p>
      <p><strong style="font-size: 14px;">ds</strong><span style="font-size: 14px;">ad</span><span style="font-size: 14px; font-family: Hei;">asdadafds</span></p><p>fsd<span style="font-size: 20px; color: rgb(240, 102, 102);">d</span></p><p><span style="font-size: 20px; color: rgb(240, 102, 102);">fds</span><s style="font-size: 20px; color: rgb(240, 102, 102);">fdsf</s></p><p><br></p><p>&lt;img src="https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png"&gt;</p><p><br></p>
    `;
    const urls = [
      {url: 'https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png', width: 300, height: 46},
      {url: 'https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png', width: 300, height: 46},
      {url: 'https://imgkr.cn-bj.ufileos.com/852d9c4a-1340-458a-b05a-ddd3351b12b2.jpg', width: 1000, height: 1000},
      {url: 'https://imgkr.cn-bj.ufileos.com/694abf7a-6bf2-4f6f-8bec-59b86e286086.jpg', width: 5744, height: 3230},
      {url: 'https://tpc.googlesyndication.com/simgad/10949952014676677817', width: 728, height: 90},
    ];
    this.content = this.richEditorCustomTransform.restore(content, urls);
    this.comment = this.richEditorCustomTransform.restore(content, urls);
    setTimeout(() => {
      this.container.nativeElement.scrollTop = 0;
      const items = this.contentContainer.nativeElement.querySelectorAll('img');
      items.forEach((item, index) => {
        item.style.cursor = 'zoom-in';
        item.addEventListener('click', () => {
          viewerjs(urls.map(t => ({url: t.url, alt: '描述' + index})), index);
        });
      });
    }, 0);
  }

  handleClick(e) {
    e.target.classList.add('like-active');
  }

}
