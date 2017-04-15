export default function loadImages(imgUrls) {
  let promises = Object.keys(imgUrls).map((title) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', function() {
        console.log('loaded: ', imgUrls[title], img);
        resolve({
          key: title,
          value: {
            imgObject: img
          }
        });
      }, false);
      img.src = imgUrls[title];
    });
  });
  return Promise
    .all(promises)
    .then((imgs) => {
      return imgs.reduce((res, img) => res[img.key] = img.value, {});
    });
};
