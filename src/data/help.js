import React from "react";
import { Popover, Button } from "antd";

class Pop extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div>
        <h4 style={{ display: "inline" }}>{title}</h4>
        <Popover content={children} title={title} trigger="click">
          <Button
            icon="question"
            shape="circle"
            size="small"
            style={{ margin: "5px" }}
          />
        </Popover>
      </div>
    );
  }
}

const NameHelp = () => (
  <Pop title="Nómbre del prodúcto">
    <div>
      <p>
        El nómbre debe ser descriptivo y breve
        <br />
        no mas de 4 palabras. los detalles extras
        <br />
        debe ir en la descripción.
      </p>
    </div>
  </Pop>
);
const DescHelp = () => (
  <Pop title="Descripción del prodúcto">
    <div>
      <p>
        En la descripción va toda la <br />
        información detallada del producto. <br />
        tambien es relevante en las busquedas
      </p>
    </div>
  </Pop>
);

const BarcodeHelp = () => (
  <Pop title="Código">
    <div>
      <p>
        El código es unico entro todos los productos <br />
        debe ser en lo posible corto e intuitivo. <br />
        (hasta 20 caracteres)para referenciar un producto
      </p>
    </div>
  </Pop>
);

const TagsHelp = () => (
  <Pop title="Etiquetas">
    <div>
      <p>
        Las etiquetas son las palabras claves que <br />
        determinan la composición del producto, puede <br />
        ser: marca, modelo, color, o cualquier <br />
        característica que lo identifique
      </p>
    </div>
  </Pop>
);

const ImagesHelp = () => (
  <Pop title="Imagenes">
    <div>
      <p>
        Puede subir imagenes del producto <br />
        estas se mostraran en distintas vistas <br />
        y se crearán miniaturas automaticamente <br />
      </p>
    </div>
  </Pop>
);

const ColorHelp = () => (
  <Pop title="Colores">
    <div>
      <p>
        Si separa los productos por colores agregue <br />
        solo el color en cuestión, de lo contrario <br />
        agregue todos los colores disponibles para el producto
        <br />
      </p>
    </div>
  </Pop>
);
const PriceHelp = () => (
  <Pop title="Precio del prodúcto">
    <div>
      <p>
        El precio está formado por el costo + iva + ganancia <br />
      </p>
      <ul>
        <li />
      </ul>
    </div>
  </Pop>
);

export {
  NameHelp,
  DescHelp,
  BarcodeHelp,
  TagsHelp,
  ImagesHelp,
  ColorHelp,
  PriceHelp,
  Pop
};
