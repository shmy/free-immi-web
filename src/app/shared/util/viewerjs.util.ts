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
export function getPlaceholderImage(width, height: number | string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="black" fill-opacity="0.1"/></svg>`;
}
