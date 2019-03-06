import ProductsData from "./products";

let _products = null;
let instance = null;
const validate = require("validate.js");
export default class {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
  }
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
  delete(product) {
    let prods = this.getProducts();
    const count = prods.length;

    let noItem = prods.filter(el => el.id !== product.id);
    _products = noItem;

    this.setProducts(noItem);
    return noItem.length !== count;
  }

  getErrors(product) {
    const constraints = {
      name: {
        presence: true,
        length: {
          minimum: 3,
          maximum: 40,
          tooLong: "En nómbre es demasiado largo",
          tooShort: "El nómbre es demasiado corto"
        }
      },
      description: {
        length: {
          maximum: 80,
          tooLong: "La descripción es demasiado larga"
        }
      },
      code: {
        presence: {
          allowEmpty: false,
          message: "El código es obligatorio"
        },
        length: {
          maximum: 25,
          tooLong: "El código es muy largo, hasta 25 caracteres"
        }
      }
    };
    const rest = validate(product, constraints, { fullMessages: false });

    return rest || {};
  }

  getProducts(filter) {
    if (!_products) {
      const prods = localStorage.getItem("products");
      _products = JSON.parse(prods) || [];
    }
    if (_products.length === 0) {
      this.setProducts(ProductsData);
    }
    if (filter) {
      return this.doSearch(_products, filter);
    }
    return _products;
  }

  doSearch(s = [], filter = {}) {
    const { tags = [], text = "" } = filter;
    const result = validate(filter, {
      tags: {
        presence: {
          allowEmpty: false
        }
      },
      text: {
        presence: {
          allowEmpty: false
        }
      }
    });
    if (!result) {
      // estan los dos
      return s.filter(p => {
        return (
          p.name.indexOf(text) >= 0 &&
          p.tags &&
          p.tags.length >= tags.length &&
          tags.filter(r => p.tags.indexOf(r) >= 0).length === tags.length
        );
      });
    } else if (!result.text) {
      // hay texto
      return s.filter(p => {
        return p.name.indexOf(text) >= 0;
      });
    } else if (!result.tags) {
      // hay tags
      return s.filter(p => {
        return (
          p.tags &&
          p.tags.length >= tags.length &&
          tags.filter(r => {
            return p.tags.indexOf(r) >= 0;
          }).length === tags.length
        );
      });
    }
    _products = this.getProducts();
    return _products;
  }

  setProducts(prodList) {
    if (prodList) {
      _products = prodList;
      localStorage.setItem("products", JSON.stringify(prodList));
    }
  }
}
