const jquery = require("jquery");
window.$ = window.jQuery = jquery;
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { data } from "./data.js";

const generateElementResponsive = (w, h, url, thumb, caption) => {
  const a = ` <a data-lg-size="${w}-${h}" class="gallery-item" data-src="${url}" data-sub-html="<h4>${caption}</h4>class="img-responsive" src="${url}" />
</a>`;
};

function getMeta(url) {
  var img = new Image(url);
  img.addEventListener("load", function () {
    alert(this.naturalWidth + " " + this.naturalHeight);
  });
  img.src = url;
  return { width: this.naturalWidth, height: this.naturalHeight };
}
const genertateImages = (url, thumb, caption) => {
  // const dimensions = getMeta(url);
  // console.log(dimensions);
  // const width = dimensions.width;
  // const height = dimensions.height;
  // return;
  const a = ` <a href="${url}" data-sub-html=".caption">
<img alt="${caption}" src="${thumb}" /> <div class="caption" style="display:none">
<h4>Caption1</h4>
<p>Desc1</p>
</div>
</a>
`;

  return a;
};

// const o = JSON.parse(obj);
// const images = o.data;
// return;
// const items = images.map((image) => {
//   const o = {};
//   o.src = "data:image/png;base64," + image.fieldData.b64;
//   o.thumb = "data:image/png;base64," + image.fieldData.Thumb;
//   o.w = image.fieldData.width;
//   o.h = image.fieldData.height;
//   console.log(o);
//   return o;
// });
// console.log(items);
// const $dynamicGallery = document.getElementById("dynamic-gallery-demo");
// const dynamicGallery = document.getElementById("dynamicGallery");
// lightGallery($dynamicGallery, {
//   plugins: [lgThumbnail, lgZoom],
//   dynamic: true,
//   licenseKey: "EB7B1732-E7704360-A97F0905-0C0C3536",
//   dynamicEl: items,
// });

window.loadGallery = () => {
  const images = data.data;
  console.log(images);
  const gallery = document.getElementById("lightgallery");

  images.forEach((image) => {
    const url = image.fieldData.ArchiveURL;
    const thumb = image.fieldData.ArchiveURL_thumb;
    const caption = image.fieldData.zzCreatedByDisplay;
    const a = genertateImages(url, thumb, caption);

    gallery.insertAdjacentHTML("beforeend", a);
  });

  lightGallery(gallery, {
    plugins: [lgZoom, lgThumbnail],
    licenseKey: "your_license_key",
    speed: 500,
    download: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  });
};
