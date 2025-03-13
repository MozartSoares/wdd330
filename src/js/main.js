import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';
const dataSource = new ProductData('tents');
const htmlElement = document.getElementById('productList');

const productList = new ProductList('tents', dataSource, htmlElement);
console.log(dataSource);
productList.init();
