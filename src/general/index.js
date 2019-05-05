import Filter from "./filter"
import {message} from "antd"
import SidePanel from "./sidepanel"
import HeaderView from "./headerView"
import EditableNumber from "./editableNumber"
import HelpTitle from "./helpTitle"
import Tags from "./tags"
import Wall from "./wall"
import Colors from "./colors"
import NameEditor from "./nameEditor"
import FieldEditor from "./fieldEditor"
import Selector from "./selector"
import SideEditor from "./sideEditor"
import {getConfig, saveConfig, initConfig} from "./config"
import {
  isEmpty,
  bool,
  searchText,
  isEmptyFilter,
  getThumbnail,
  roundStyle,
  compareFilter
} from "./util"
import List from "./list"
import LineView from "./lineView"
import userPermission from "../user/permission"
const showError = e => message.error(e.message)

export {
  Filter,
  SidePanel,
  isEmpty,
  searchText,
  isEmptyFilter,
  getThumbnail,
  HeaderView,
  List,
  EditableNumber,
  roundStyle,
  HelpTitle,
  Tags,
  Wall,
  Colors,
  NameEditor,
  saveConfig,
  getConfig,
  initConfig,
  FieldEditor,
  Selector,
  SideEditor,
  compareFilter,
  LineView,
  userPermission,
  showError,
  bool
}
