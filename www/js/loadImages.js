const collect = (res, img) => ({
  ...res,
  [img.key]: img.value
});

const loadImage = (title, url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve({
        key: title,
        value: { imgObject: img }
      });
    }, false);
    img.src = url;
  });
};

export default function loadImages(imgUrls) {
  let promises = Object.keys(imgUrls).map((title) => {
    return loadImage(title, imgUrls[title]);
  });
  return Promise
    .all(promises)
    .then((imgs) => imgs.reduce(collect, {}));
};
