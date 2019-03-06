import React from "react";
import { Upload, Icon, Modal } from "antd";
const uploadButton = (
  <div>
    <Icon type="plus" />
  </div>
);
export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: props.files || []
    };
    this.dataSource = props.dataSource || [];
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { onListChange, editable = false, limit = 5 } = this.props;

    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          showUploadList={{ showRemoveIcon: editable }}
          disabled={!editable}
          onPreview={this.handlePreview}
          onChange={({ fileList }) => {
            if (onListChange) onListChange(fileList);
            this.setState({ fileList });
          }}
        >
          {editable && fileList.length < limit ? uploadButton : null}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
