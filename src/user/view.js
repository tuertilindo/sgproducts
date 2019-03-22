import React from "react"
import {Selector, userPermission, showError} from "../general"
import {Button, Tooltip, Tag} from "antd"
import {search, getStyleByUserType, userStyles} from "./util"

const View = ({showSide, ...props}) => {
  const {user, onLogout, onSelect} = props
  const permission = userPermission(user)
  const {type} = user
  const {style} = userStyles[type]
  return (
    <div>
      <span>
        {user ? user.name + " " : "desconocido "}
        <Tag style={style}>{type}</Tag>
      </span>
      <Tooltip title="Agregar usuario" mouseEnterDelay={1} placement="right">
        <Button
          disabled={!permission.isAdmin}
          style={{float: "right"}}
          shape="circle"
          size="small"
          onClick={() => onSelect({})}
          icon="user-add"
        />
      </Tooltip>
      <Tooltip title="Buscar usuario" mouseEnterDelay={1} placement="right">
        <Button
          disabled={!permission.isAdmin}
          style={{float: "right"}}
          shape="circle"
          size="small"
          onClick={() => showSide(true)}
          icon="team"
        />
      </Tooltip>
      <Tooltip title="Cerrar sesión" mouseEnterDelay={1} placement="right">
        <Button
          style={{float: "right"}}
          shape="circle"
          size="small"
          onClick={() => {
            window.sgapi.logout(user).catch(showError)
            onLogout()
          }}
          icon="close"
        />
      </Tooltip>
    </div>
  )
}

export default class extends React.Component {
  render() {
    const {onSelect} = this.props
    return (
      <Selector
        target={"users"}
        icon="user"
        title="Buscar usuario"
        placement="left"
        placeholder="buscar por nómbre..."
        emptyText="No se encontro ningún usuario"
        emptyIcon="user"
        types={{
          all: "Todos",
          cliente: "Clientes",
          vendedor: "Vendedores",
          encargado: "Encargados",
          contador: "Contadores",
          admin: "Administradores"
        }}
        typeStyler={getStyleByUserType}
        search={search}
        onSelect={onSelect}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
