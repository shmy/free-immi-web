import {IRichTransformInterface, IUrl} from './rich-transform.interface';
import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {getPlaceholderImage} from "../../util/viewerjs.util";
// 查找 所有img标签
const restoreImgTagMatchRegExp = /<img.*?(?:>|\/>)/gi;
// 查找 img 的src
// const extractImgSrcRegExp = /src=\"(.*)\"/;
// 查找 img 的data-id
// const extractImgDataIdRegExp = /data-id=\"(.*)\"/;
// 替换成带索引的标签
// const transformImgTagMatcher = (id: string) => `<img data-id="${id}">`;
const restoreImgTagMatcher = (id: string) => new RegExp(`<img data-id="${id}".*?(?:>|\\/>)`, 'ig');

@Injectable({
  providedIn: 'root'
})
export class RichEditorCustomTransform implements IRichTransformInterface {
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  // restore image
  restore(content: string, urls: IUrl[] = []) {
    urls.forEach((item) => {
      // TODO: baseURL
      const path = item.path;
      content = content.replace(restoreImgTagMatcher(item.id), imgStr => {
        const el = this.createElementFromHTML(imgStr) as HTMLImageElement;
        el.dataset.lazySrc = path;
        el.dataset.lazyError = '';
        el.classList.add('lazy-loading');
        el.src = getPlaceholderImage(el.dataset.width, el.dataset.height);
        return el.outerHTML;
      });
    });
    return content;
  }

  // transform image
  transform(content: string) {
    const matched = content.match(restoreImgTagMatchRegExp);
    const imageIds: string[] = [];
    if (matched) {
      matched.forEach((item) => {
        const el = this.createElementFromHTML(item) as HTMLImageElement;
        const src = el.src;
        const id = el.dataset.id;
        const width = el.dataset.width;
        const height = el.dataset.height;
        imageIds.push(id);
        content = content.replace(item, `<img data-id="${id}" data-width="${width}" data-height="${height}">`);
      });
    }
    return {
      content,
      imageIds
    };
  }

  createElementFromHTML(htmlString: string) {
    const div = this.document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
}
