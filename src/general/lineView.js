import React from "react"
import {PageHeader, Button, Icon} from "antd"

export default class extends React.Component {
  render() {
    const {
      allowed,
      title,
      subtitle,
      onSearch,
      onClick,
      customStyle
    } = this.props

    return allowed ? (
      <PageHeader
        backIcon={<Icon type="search" />}
        onBack={onSearch}
        title={title}
        subTitle={subtitle}
        extra={[
          <Button
            onClick={onClick}
            icon={customStyle.icon}
            style={customStyle.style}
            shape="round"
          />
        ]}
      />
    ) : null
  }
}
