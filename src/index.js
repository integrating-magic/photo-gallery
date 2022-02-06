// const jquery = require("jquery");
// window.$ = window.jQuery = jquery;
// import lightGallery from "lightgallery";
// // import justifiedGallery from "jquery.justifiedGallery";
// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import lgZoom from "lightgallery/plugins/zoom";
import { data } from "./data.js";

const generateElementResponsive = (w, h, url, thumb, caption) => {
  const a = ` <a data-lg-size="${w}-${h}" class="gallery-item" data-src="${url}" data-sub-html="<h4>${caption}</h4>class="img-responsive" src="${url}" />
</a>`;
};
const genImage = (url, thumb, createdBy, note) => {
  const a = `<a
  href="${url}"
  data-src="${url}"
  data-sub-html=".caption"
  class="gallery-item"
>
  <img
    alt="Buddy.buchtler"
    src=${thumb}"
  />
  <div class="caption" style="display: none">
    <h4>${caption}</h4>
  </div>
</a>`;
  return a;
};
async function getMeta(url) {
  const img = new Image();
  img.src = url;
  await img.decode();
  // console.log(`width: ${img.width}, height: ${img.height}`);
  return img;
}
const genertateImages = (url, thumb, createdBy, note, id, dim) => {
  console.log("GEN", dim);
  const a = ` <a  id = ${id} data-src=${url}  data-lg-size="1600-2400" data-sub-html=".caption" class="gallery-item">
<img alt="${createdBy}  - ${note}" src="${url}" /> <div class="caption" style="display:none">

</div>
</a>
`;

  return a;
};
const defaultConfig = {
  displayThumbnail: false,
  captions: true,
  rowHeight: 180,
  margins: 5,
  lastRow: "left",
  randomize: false,
};
window.loadGallery = (fmObj) => {
  const o = JSON.parse(fmObj);
  const fmData = o.data;
  const config = o.config || defaultConfig;
  // console.log(fmData);
  // const obj = JSON.parse(fmData);
  const obj = data;
  const images = obj.data;
  // console.log(images);
  const gallery = document.getElementById("lightgallery");
  let divs = [];
  const newImages = images.slice(0, 100);
  newImages.forEach(async (image) => {
    const url = image.fieldData.ArchiveURL;
    const img = new Image();
    img.src = url;
    // await img.decode();
    const dim = { width: 960, height: 1280 };
    const thumb = image.fieldData.ArchiveURL_thumb;
    const id = image.fieldData.zzid;
    const createdBy = "Image taken by: " + image.fieldData.zzCreatedByDisplay;
    const note = image.fieldData.Note || "No note";
    const a = genertateImages(url, thumb, createdBy, note, id, dim);

    gallery.insertAdjacentHTML("beforeend", a);
  });

  $("#lightgallery")
    .justifiedGallery({
      captions: config.captions,
      lastRow: config.lastRow,
      rowHeight: config.rowHeight,
      margins: config.margins,
      randomize: config.randomize,
    })
    .on("jg.complete", function () {
      window.lightGallery(document.getElementById("lightgallery"), {
        plugins: [lgZoom, lgThumbnail],
        // mobileSettings: {
        //   controls: false,
        //   showCloseIcon: false,
        //   download: false,
        //   rotate: false,
        // },
      });
    });

  $(".gallery-item").on("click", function (e) {
    const id = e.currentTarget.id;
    console.log(id);
    const obj = { id };
    FileMaker.PerformScript("Open Image ({id})", JSON.stringify(obj));
  });
};
