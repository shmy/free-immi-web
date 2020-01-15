import {IRichTransformInterface, IUrl} from './rich-transform.interface';
import {Injectable} from '@angular/core';
// 查找 所有img标签
const restoreImgTagMatchRegExp = /<img.*?(?:>|\/>)/gi;
// 查找 img 的src
const extractImgSrcRegExp = /src=\"(.*)\"/;
// 查找 img 的data-id
const extractImgDataIdRegExp = /data-id=\"(.*)\"/;
// 替换成带索引的标签
const transformImgTagMatcher = (id: string) => `<img data-id="${id}">`;

@Injectable({
  providedIn: 'root'
})
export class RichEditorCustomTransform implements IRichTransformInterface {
  // restore image
  restore(content: string, urls: IUrl[] = []) {
    urls.forEach((item) => {
      // console.log(item);
      content = content.replace(transformImgTagMatcher(item.id), `<img data-id="${item.id}" src="${item.path}" />`);
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
