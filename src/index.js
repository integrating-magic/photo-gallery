window.loadGallery = (obj) => {
  const o = JSON.parse(obj);
  const images = o.data;
  console.log(images);
  //   return;
  const items = images.map((image) => {
    const o = {};
    o.src = "data:image/png;base64," + image.fieldData.b64;
    o.w = image.fieldData.width;
    o.h = image.fieldData.height;
    return o;
  });
};
