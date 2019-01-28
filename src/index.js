import React from "react";
import ReactDOM from "react-dom";
import { version, Button, Icon } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { Tags, Thumnails } from "./controls";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Tags
          tags={["puto", "el", "que", "lee"]}
          editable
          onCreate={tag => console.log("se creo " + tag)}
          onClose={tag => console.log("se elimino " + tag)}
        />
        <Thumnails
          cards={[
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            },
            {
              title: "Tarjeta ",
              description: "Descripcion tarjeta",
              path:
                "https://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=rmattos2001&size=extralarge&version=00000000-0000-0000-0000-000000000000"
            }
          ]}
        />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
