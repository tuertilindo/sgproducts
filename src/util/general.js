const getThumbnail = product => {
  if (
    product &&
    product.images &&
    product.images.length > 0 &&
    product.images[0].thumbUrl
  ) {
    const index =
      product.thumbIndex && product.thumbIndex > 0 ? product.thumbIndex : 0;
    return product.images[index].thumbUrl;
  }
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAATlBMVEX///91dXX+/v709PT19fVycnL7+/v4+Pirq6u6urrj4+Pw8PCysrK9vb3n5+d7e3vd3d2kpKTNzc3V1dWVlZWNjY2CgoKcnJzFxcXPz8+9knKYAAADjUlEQVR4nO2b27qqIBRGFSRLEknL1X7/F91gqOARBMELuJyyHP9XOhm5MEmuNgAfAWoX4YMbH8B77Tr8PM9n88+vDcdyPoD32nX4WZbN5p9fU45lk/nZ+TWZD2fzITy7loCeny/kPZ/fNyR+bwTh334Buntzer144YsAt1so/i8A4AEC8FlH7FoiAPN+7YfPAiQiQBi+WBNYgAB81hH7NWkqB5742XDdTVuTFz5cXxP88GFo/mxNiPzIj3zuZKH50Qkv6ISkvKvjxYd57Zsfc8K6StWB+DhSq5ojTtike+fVr1X0gBN+3PFT9DZ3QuKSjxA2dsLCKR8RYycstM6rXcNT/q4T9gFs7j9eEZnghLHvhH2AxK7XYPGZwMm8fSccA1j1OiK+E7g9b+HYEMCu/xJxTcDNeUvH+gCW/Z+IaxJuzVs81gewXH+IuCfgxrzlc4gAyHL96/sZNOWLAAhN55Pv89HoZ8JKABMnLEQPUeeTv+6+bmuw9bdSTQlg5ISF6GHKfFr1ve4plbe+EzmAmRMWoofKNVyNvfarxZcDGDphIVhy7SX1+irT4UsBTJ2wECyplCtrTa3DHwMYOyEVLKlGlbXursMfAmBjJ6SCJdVqZa196fCHAMTYCalgSbVGWevvOvw+ACLGTkhRqgRgNZzKrlFr9UQs+hkxdkKaKgG62kviV7lWT8ain5HDTijXsPRL4au3JuDU1gmV89IhwRPorUnY2gnV87K1gI/2n+6aiJ07Ia7LLwWXdcL6k1Yv6eP27YRld5+2ZKz5dcJS9ImKDDWvTlgOfeqXwLcTllKf5AlOckItPr8OznFCXT5LQM9wwt91Nfutv8BPUUXdOyE/x7dF6F3s8xFL4NwJ2Tme3X1d0X0+k3fi2AkHvpxgnd91JKdOOPLHBFt8nsCpE0r8PsE2nyXoH/Y5cUKZ/0uwx2ezRM2FE6p8nmCfP9QcOOGUz5/AavMdOOGcz3pNo8u3d8IlPqt4eE64xTeoWTqhNd/SCe35dk7ogG/lhC74Nk7ohG/hhG74Fk7ohm/hhG74Fk7ohn/ACTOn/AoYO2HydsjnD5RMnRDQ1B2/XXHS7f8dN60r/oes8Hf2E8KmfMjjycfjYVor155nxP2EcT9h3E+YLA1P/LifMPIj/4r8uJ8w7ieM75j450cnvLAT+nnvbtUJg793GPq9y8D80O/dBn/vOCw/9Hvngfj/Ab/OZlxNq6FvAAAAAElFTkSuQmCC";
};

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const search = (s = [], filter = {}, criteria = () => true) => {
  const { tags = [], text = "" } = filter;
  return s.filter(i => {
    return text.length > 0
      ? criteria(i, text)
      : true &&
          tags.length === 0 &&
          (!i.tags || i.tags.length === 0) &&
          tags.filter(r => i.tags.indexOf(r) >= 0).length === tags.length;
  });
};

const basicSearch = (s = [], f = {}) =>{
  search(s, f, (i, t) => i.name.indexOf(t) >= 0);
}

export { getThumbnail, isEmpty, search, basicSearch };
