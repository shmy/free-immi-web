function canLazyLoad() {
  return window && 'IntersectionObserver' in window;
}

function lazyLoadImage(el: HTMLImageElement, cb: () => void) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(({isIntersecting}) => {
      if (isIntersecting) {
        cb();
        obs.unobserve(el);
      }
    });
  }, {});
  obs.observe(el);
}

function loadImage(el: HTMLImageElement, url: string, errorPlaceholder: string) {
  const img = new Image();
  // @ts-ignore
  img.onload = img.onerror = ({type}) => {
    el.src = type === 'load' ? url : errorPlaceholder;
    el.classList.add('lazy-loaded');
  };
  img.src = url;
  // el.src = loadingPlaceholder;
}

export default (el: HTMLImageElement) => {
  const {lazySrc, lazyError} = el.dataset;
  if (!canLazyLoad()) {
    loadImage(el, lazySrc, lazyError);
    return;
  }
  lazyLoadImage(el, () => {
    loadImage(el, lazySrc, lazyError);
  });
};
