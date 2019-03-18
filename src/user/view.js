import React from "react"
import {Selector, removeEntity} from "../general"
import {Button, Tooltip} from "antd"
import {search, getStyleByUserType} from "./util"

const View = ({showSide, ...props}) => {
  const {style, className, user, onLogout, onSelect} = props

  return (
    <div>
      <span style={style} className={className}>
        {user ? user.name : "desconocido"}
      </span>
      <Tooltip title="Agregar usuario" mouseEnterDelay={1} placement="right">
        <Button
          style={{float: "right"}}
          shape="circle"
          size="small"
          onClick={() => onSelect({})}
          icon="user-add"
        />
      </Tooltip>
      <Tooltip title="Buscar usuario" mouseEnterDelay={1} placement="right">
        <Button
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
            removeEntity(user.email, "logins")
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
        typeStyler={getStyleByUserType}
        search={search}
        onSelect={onSelect}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
