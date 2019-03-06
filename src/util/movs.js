import { search } from "./general";
const validate = require("validate.js");

const validateMov = mov => {
  const constraints = {
    destiny: {
      presence: true,
      allowEmpty: false
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
  const rest = validate(mov, constraints, { fullMessages: false });

  return rest || {};
};

const transformMov = mov => {
  const {
    items = [],
    descuentos = [],
    target = {},
    status,
    type,
    tags = []
  } = mov;

  let nitems = [];
  let customDescuentos = [];
  let ivas = {};
  let subtotal = 0;
  let descontado = 0;
  for (let i = 0; i < items.length; i++) {
    let {
      count = 0,
      price = 0,
      code = "unknow",
      name = "unknow",
      iva = 21,
      newPrice
    } = items[i];

    const c = parseFloat(count);
    const p = parseFloat(price);
    const t = c * p;
    if (c > 0) {
      //calcular descuento
      let np = newPrice ? parseFloat(newPrice) : p;
      let nt = np * c;

      const desc = nt - t;
      if (desc !== 0) {
        let scalar = nt / t;
        let percent = (scalar * 100 - 100).toFixed(2) + "%";
        let label = desc < 0 ? "descuento" : "interes";
        customDescuentos.push({
          name: name,
          price: desc,
          codes: [code],
          percent,
          scalar,
          label,
          type: "custom"
        });
      }

      nitems.push({
        id: i,
        name,
        code,
        count: c,
        price: p,
        total: t,
        newPrice: np,
        newTotal: nt,
        status,
        type,
        tags
      });
      const niva = nt - nt / (1 + iva / 100);
      ivas[iva + "%"] = ivas[iva + "%"] + niva || niva;
      subtotal += nt;
    }
  }

  for (let i = 0; i < descuentos.length; i++) {
    const { price, codes = [], type } = descuentos[i];
    const d = parseFloat(price);
    descuentos[i].price = d;

    if (type !== "custom") {
      if (items.filter(i => codes.indexOf(i.code) > -1) > 0) {
        customDescuentos.push(descuentos[i]);
        descontado += d;
      }
    }
  }
  for (var key in ivas) {
    if (ivas.hasOwnProperty(key)) {
      customDescuentos.push({
        name: "total de IVA al " + key,
        price: ivas[key],
        percent: key,
        label: "impuesto",
        type: "iva"
      });
    }
  }
  let ret = {
    items: nitems,
    name: target.name || "desconocido",
    subtotal,

    target,
    total: subtotal + descontado,
    descontado,
    descuentos: customDescuentos
  };
  return ret;
};

const getTaxData = item => {};

const searchMovs = (s = [], f = {}) =>
  search(s, f, (i, t) => i.description.indexOf(t) >= 0);

export { validateMov, searchMovs, transformMov };
