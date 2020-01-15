import Viewer from 'viewerjs';
interface IImageMeta {
  url: string;
  alt?: string;
}
export default (metas: IImageMeta[], index= 0) => {
  const images = metas.map(meta => {
    const img = new Image();
    img.src = meta.url;
    img.alt = meta.alt || '暂无描述';
    return img;
  });
  const div = document.createElement('div');
  div.append(...images);
  // @ts-ignore
  const viewer = new Viewer(div, {
    zIndex: 3000,
    hidden() {
      viewer.destroy();
    },
    initialViewIndex: index,
  });
  // image.click();
  viewer.show();
};
