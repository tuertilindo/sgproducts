import { search } from "./general";

const validate = require("validate.js");

const validateProduct = product => {
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
        maximum: 128,
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
};

const extractCodes = prods => {
  let ret = {};
  for (let i = 0; i < prods.length; i++) {
    const code = prods[i].code;
    if (code) ret[code] = i;
  }
  return ret;
};

const searchProduct = (s = [], f = {}) =>
  search(s, f, (i, t) => i.name.indexOf(t) >= 0);

export { validateProduct, searchProduct, extractCodes };
