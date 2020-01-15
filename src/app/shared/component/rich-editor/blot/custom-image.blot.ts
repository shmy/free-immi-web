import * as Quill from 'quill';
const BaseImage =  Quill.import('formats/image');

export class CustomImageBlot extends BaseImage {
  static create(value) {
    const node = super.create(value.src);
    node.dataset.id = value.id;
    return node;
  }
}
// @ts-ignore
CustomImageBlot.blotName = 'immi-img';
// @ts-ignore
CustomImageBlot.tagName = 'img';
