let _products = null;
export default class {
  save(product) {
    let prods = this.getProducts();
    const count = prods.length;

    if (product.id > 0) {
      for (let i = 0; i < count; i++) {
        if (prods[i].id === product.id) {
          prods[i] = product;
          break;
        }
      }
    } else {
      product.id = count > 0 ? prods[count - 1].id + 1 : 1;

      prods.push(product);
    }
    this.setProducts(prods);
    return product;
  }

  getProducts() {
    if (!_products) {
      const prods = localStorage.getItem("products");
      _products = JSON.parse(prods) || [];
    }
    return _products;
  }
  setProducts(prodList) {
    if (prodList) {
      _products = prodList;
      localStorage.setItem("products", JSON.stringify(prodList));
    }
  }
}
