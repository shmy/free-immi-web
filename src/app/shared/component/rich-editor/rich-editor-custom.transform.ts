import {IRichTransformInterface, IUrl} from './rich-transform.interface';
import {Injectable} from '@angular/core';
// 查找 所有img标签
const restoreImgTagMatchRegExp = /<img.*?(?:>|\/>)/gi;
// 查找 img 的src
const extractImgSrcRegExp = /src=\"(.*)\"/;
// 替换成带索引的标签
const transformImgTagMatcher = (index: number) => `<img style="display: none" data-index="${index}">`;
@Injectable({
  providedIn: 'root'
})
export class RichEditorCustomTransform implements IRichTransformInterface {
  // restore image
  restore(content: string, urls: IUrl[] = []) {
    urls.forEach((item, index) => {
      // console.log(item);
      content = content.replace(transformImgTagMatcher(index), `<img data-height="${item.height}" data-width="${item.width}" src="${item.url}" />`);
    });
    return content;
  }

  // transform image
  transform(content: string) {
    const matched = content.match(restoreImgTagMatchRegExp);
    const urls: string[] = [];
    if (matched) {
      matched.forEach((item, index) => {
        const srcMatched = item.match(extractImgSrcRegExp);
        if (srcMatched) {
          urls.push(srcMatched[1]);
          content = content.replace(item, transformImgTagMatcher(index));
        }
      });
    }
    return {
      content,
      urls
    };
  }
}
