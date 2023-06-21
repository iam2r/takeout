import {
  Checkbox,
  CheckboxGroup,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Icon,
  Popover
} from 'element-ui'
import { PluginObject } from 'vue'
const ElementUIPlugin: PluginObject<unknown> = {
  install: (Vue): void => {
    Vue.use(Icon)
      .use(Dropdown)
      .use(DropdownItem)
      .use(DropdownMenu)
      .use(Dialog)
      .use(Popover)
      .use(Checkbox)
      .use(CheckboxGroup)
  }
}

export default ElementUIPlugin
