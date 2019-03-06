import MovsData from "./movs";

let _movs = null;
let instance = null;
const validate = require("validate.js");
export default class {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
  }
  save(mov) {
    let mvs = this.getMovs();
    const count = mvs.length;

    if (mov.id > 0) {
      for (let i = 0; i < count; i++) {
        if (mvs[i].id === mov.id) {
          mvs[i] = mov;
          break;
        }
      }
    } else {
      mov.id = count > 0 ? mvs[count - 1].id + 1 : 1;
      mvs.push(mov);
    }
    this.setMovs(mvs);
    return mov;
  }
  delete(mov) {
    let mvs = this.getMovs();
    const count = mvs.length;

    let noItem = mvs.filter(el => el.id !== mov.id);
    _movs = noItem;

    this.setMovs(noItem);
    return noItem.length !== count;
  }

  getErrors(mov) {
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
    const rest = validate(mov, constraints, { fullMessages: false });

    return rest || {};
  }

  getMovs(filter) {
    if (!_movs) {
      const mvs = localStorage.getItem("movs");
      _movs = JSON.parse(mvs) || [];
    }
    if (_movs.length === 0) {
      this.setMovs(MovsData);
    }
    if (filter) {
      return this.doSearch(_movs, filter);
    }
    return _movs;
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
    _movs = this.getMovs();
    return _movs;
  }

  setMovs(prodList) {
    if (prodList) {
      _movs = prodList;
      localStorage.setItem("movs", JSON.stringify(prodList));
    }
  }
}
