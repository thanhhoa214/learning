const templateDeclaration = `
<template id="swd-root-product-list-item">
<div class="col-8">
  <div class="h6" id="title">title</div>
  <p id="description">description</p>
</div>
<div class="col-4">
  <div class="text-center h5">$ <span id="price">price</span></div>
</div>
</template>
<template id="swd-root-product-list">
<div class="bg-lightblue">
  <div class="bg-lightblue pl-3 pt-3 m-h1" id="title">Title</div>
</div>
<div class="pl-3" id="products"></div>
</template>
<template id="swd-root-box">
<div class="mb-2 media-box">
  <img class="w-100 h-100" id="headerImage" />
</div>
<div id="product-lists"></div>
<div class="mb-2 media-box">
  <img class="w-100 h-100" id="footerImage" />
</div>
</template>
<template id="swd-root-template">
<div class="row mx-0 overflow-hidden">
  <swd-root-box class="col-4"></swd-root-box>
  <swd-root-box class="col-4"></swd-root-box>
  <swd-root-box class="col-4"></swd-root-box>
</div>
</template>`;
const styleDeclaration = `
.bg-lightblue {
  height: 4rem;
  background-color: #3586bb !important;
  color: white;
}
#template-root * {
  background-color: #2f4554;
  color: #ffffff;
}

swd-root-box {
  cursor: pointer;
}
swd-root-box .media-box {
  height: 16rem;
}

swd-root-box .media-box img {
  object-fit: cover;
}
swd-root-box.selected-active-element:before {
  content: '';
  border: 3px dashed rgb(255, 255, 255);
  z-index: 999999;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.15);
}
.m-h1 {
  font-size: 2rem;
}
`;
// Declare templates
const styleElement = document.createElement("style");
styleElement.innerText = styleDeclaration;
document.getElementsByTagName("head")[0].appendChild(styleElement);
const templateRoot = document.getElementById("template-root");
const templateDeclarationElement = document.createElement("div", {
  id: "template-declaration",
  class: "d-none",
});
templateDeclarationElement.innerHTML = templateDeclaration;
templateRoot.parentElement.appendChild(templateDeclarationElement);

export class BoxElement extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("swd-root-box");
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
  static get observedAttributes() {
    return ["box"];
  }
  get box() {
    return this.getAttribute("box");
  }

  set box(box) {
    if (box) {
      this.setAttribute("box", box);
    } else {
      this.removeAttribute("box");
    }
  }
  connectedCallback() {
    this.updateUI();
    if (!this.hasAttribute("box")) {
      this.setAttribute("box", "{}");
    }
  }
  attributeChangedCallback(value, oldName, newName) {
    this.updateUI();
  }
  updateUI() {
    var _a;
    const headerImage = this.querySelector("#headerImage");
    const footerImage = this.querySelector("#footerImage");
    const productListsElement = this.querySelector("#product-lists");
    const boxData = JSON.parse(
      (_a = this.box) !== null && _a !== void 0 ? _a : "{}"
    );
    if (headerImage && headerImage) {
      if (boxData?.headerSrc) {
        headerImage.src = boxData.headerSrc;
        headerImage.parentElement.classList.remove("d-none");
      } else {
        headerImage.parentElement.classList.add("d-none");
      }
      if (boxData?.footerSrc) {
        footerImage.src = boxData.footerSrc;
        footerImage.parentElement.classList.remove("d-none");
      } else {
        footerImage.parentElement.classList.add("d-none");
      }
    }
    productListsElement.innerHTML = boxData?.productLists
      ?.map(
        (productList) =>
          `<swd-root-product-list product-list='${JSON.stringify(
            productList
          )}'></swd-root-product-list>`
      )
      .join(" ");
  }
}
window.customElements.define("swd-root-box", BoxElement);

const productListItem = (product) => `
<div class="row mx-0 pt-2">
<div class="col-8">
  <div class="h6">${product.title}</div>
  <p>${product.description}</p>
</div>
<div class="col-4">
  <div class="text-center h5">$ ${product.price}</div>
</div>
</div>`;

export class ProductListElement extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("swd-root-product-list");
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
  static get observedAttributes() {
    return ["product-list"];
  }
  get productList() {
    return this.getAttribute("product-list");
  }

  set productList(productList) {
    if (productList) {
      this.setAttribute("product-list", productList);
    } else {
      this.removeAttribute("product-list");
    }
  }
  connectedCallback() {
    this.updateUI();
    if (!this.hasAttribute("product-list")) {
      this.setAttribute("product-list", "{}");
    }
  }
  attributeChangedCallback(value, oldName, newName) {
    this.updateUI();
  }
  updateUI() {
    var _a;
    const titleElement = this.querySelector("#title");
    const productsElement = this.querySelector("#products");
    const productListData = JSON.parse(
      (_a = this.productList) !== null && _a !== void 0 ? _a : "{}"
    );
    titleElement.innerText = productListData.title;
    productsElement.innerHTML = productListData?.products
      ?.map((product) => productListItem(product))
      .join(" ");
  }
}
window.customElements.define("swd-root-product-list", ProductListElement);

export class TemplateElement extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("swd-root-template");
    if (!template) {
      return;
    }
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
  static get observedAttributes() {
    return ["template", "admin"];
  }
  get template() {
    console.log("%c [TemplateElement] template - getter", "color:red;");
    return this.getAttribute("template");
  }

  set template(template) {
    console.log("%c [TemplateElement] template - setter", "color:green;");
    if (template) {
      this.setAttribute("template", template);
    } else {
      this.removeAttribute("template");
    }
  }

  get admin() {
    return this.getAttribute("admin");
  }

  set admin(admin) {
    console.log("%c [TemplateElement] admin - setter", "color:green;");
    if (admin) {
      this.setAttribute("admin", admin);
    } else {
      this.removeAttribute("admin");
    }
  }
  connectedCallback() {
    this.updateUI(this.initTemplate);

    if (this.admin) {
      // Handle event dispatcher
      const templateBoxes = document.querySelectorAll("swd-root-box");
      templateBoxes.forEach((boxElement) => {
        const event = new CustomEvent("swd-root-box-click", {
          detail: JSON.parse(boxElement.box),
        });
        boxElement.addEventListener("click", () => {
          document
            .querySelectorAll(".selected-active-element")
            .forEach((element) => {
              element.classList.remove("selected-active-element");
            });
          boxElement.classList.add("selected-active-element");
          boxElement.dispatchEvent(event);
        });
      });

      const templateProductLists = document.querySelectorAll(
        "swd-root-product-list"
      );
      templateProductLists.forEach((productListElement) => {
        const event = new CustomEvent("swd-root-product-list-click", {
          detail: JSON.parse(productListElement.productList),
        });
        productListElement.addEventListener("dblclick", () => {
          document
            .querySelectorAll(".selected-active-element")
            .forEach((element) => {
              element.classList.remove("selected-active-element");
            });
          productListElement.classList.add("selected-active-element");
          productListElement.dispatchEvent(event);
        });
      });
    }
  }
  attributeChangedCallback(value, oldName, newName) {
    this.updateUI(this.template);
  }
  updateUI(data) {
    if (!data) return;
    const boxElements = document.querySelectorAll("swd-root-box");
    // Get data from html
    const dataAsObject = JSON.parse(data);
    dataAsObject.boxes.forEach((boxData, index) => {
      boxElements[index].classList.add("px-0");
      boxElements[index].box = JSON.stringify(boxData);
    });
  }
}
window.customElements.define("swd-root-template", TemplateElement);
// =================================================================

if (!templateRoot.admin) {
  const udid = new URLSearchParams(window.location.search).get("udid");
  console.log("=====================START===========================");
  fetch("https://digital-menu-api.azurewebsites.net/api/templates/udid/" + udid)
    .then((response) => response.text())
    .then((template) => {
      templateRoot.template = template;
    });

  setInterval(async () => {
    console.log(udid);
    const response = await fetch(
      "https://digital-menu-api.azurewebsites.net/api/templates/udid/" + udid
    );
    const template = await response.text();
    templateRoot.template = template;
  }, 5000);
}
