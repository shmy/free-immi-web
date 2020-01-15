import {IRichTransformInterface, IUrl} from './rich-transform.interface';
import {Injectable} from '@angular/core';
// 查找 所有img标签
const restoreImgTagMatchRegExp = /<img.*?(?:>|\/>)/gi;
// 查找 img 的src
// const extractImgSrcRegExp = /src=\"(.*)\"/;
// 查找 img 的data-id
const extractImgDataIdRegExp = /data-id=\"(.*)\"/;
// 替换成带索引的标签
const transformImgTagMatcher = (id: string) => `<img data-id="${id}">`;
const restoreImgTagMatcher = (id: string) => new RegExp(`<img data-id="${id}">`, 'ig');

@Injectable({
  providedIn: 'root'
})
export class RichEditorCustomTransform implements IRichTransformInterface {
  // restore image
  restore(content: string, urls: IUrl[] = []) {
    urls.forEach((item) => {
      // TODO: baseURL
      const path = item.path;
      content = content.replace(restoreImgTagMatcher(item.id), `<img style="height: 300px; width: 300px" data-id="${item.id}" data-lazy-error="" data-lazy-loading="https://cdn.v2ex.com/navatar/b53b/3a3d/55_large.png?m=1550138353" data-lazy-src="${path}" />`);
    });
    return content;
  }

  // transform image
  transform(content: string) {
    const matched = content.match(restoreImgTagMatchRegExp);
    const imageIds: string[] = [];
    if (matched) {
      matched.forEach((item) => {
        // const srcMatched = item.match(extractImgSrcRegExp);
        const idMatched = item.match(extractImgDataIdRegExp);
        if (idMatched) {
          const id = idMatched[1];
          imageIds.push(id);
          content = content.replace(item, transformImgTagMatcher(id));
        }
      });
    }
    return {
      content,
      imageIds
    };
  }
}
