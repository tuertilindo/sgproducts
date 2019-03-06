
import { search } from "./general";
const searchClients = (s = [], f = {}) =>
  search(s, f, (i, t) => i.name.toUpperCase().indexOf(t.toUpperCase()) >= 0);

export { searchClients };