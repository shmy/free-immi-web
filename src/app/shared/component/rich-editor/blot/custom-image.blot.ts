import * as Quill from 'quill';
const BaseImage =  Quill.import('formats/image');

// https://www.jianshu.com/p/f6bf326c6196
export class CustomImageBlot extends BaseImage {
  static blotName = 'immi-img';
  static tagName = 'img';
  constructor(...args) {
    super(...args);
  }
  static create(value) {
    const node = super.create(value.src);
    node.dataset.id = value.id;
    node.dataset.width = value.width;
    node.dataset.height = value.height;
    return node;
  }
  static value(domNode) {
    return {
      src: domNode.getAttribute('src'),
      id: domNode.dataset.id,
      width: domNode.dataset.width,
      height: domNode.dataset.height,
    };
  }
}
