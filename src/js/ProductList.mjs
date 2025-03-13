import { renderListWithTemplate } from "./utils.mjs";

class ProductList {
  constructor(category, dataSource, listHtmlElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listHtmlElement = listHtmlElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    const unavailableProductIds = ["989CG", "880RT"];
    const availableList = list.filter(
      (product) => !unavailableProductIds.includes(product.Id),
    );
    this.renderList(availableList);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listHtmlElement, list);
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default ProductList;
