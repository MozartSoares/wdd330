import { setLocalStorage, getLocalStorage } from './utils.mjs';

class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  addProductToCart(product) {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(product);
    setLocalStorage('so-cart', cart);
  }

  async addToCartListener(e) {
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    this.addProductToCart(product);
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCartListener.bind(this));
  }

  renderProductDetails(product) {
    document.querySelector('#add-to-cart').dataset.id = product.Id;
    return `
      <section class="product-detail">
        <h2>${product.Brand.Name}</h2>
        <h3 class="divider">${product.Name}</h3>
        <img
          src="${product.Images.PrimaryExtraLarge}"
          alt="Image of ${product.NameWithoutBrand}"
          id="productImage"
          class="divider"
        />
        <p id="productOriginalPrice" class="product__original-price bold">Original price <span class="crossed-out" >$${product.SuggestedRetailPrice}</span></p>
        <p id="productPrice" class="product-card__price bold">Price with discount $${product.FinalPrice}</p>
        <p id="productColor" class="product__color">${product.Colors[0].ColorName}</p>
        <p id="productDesc" class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
  }
}

export default ProductDetails;
