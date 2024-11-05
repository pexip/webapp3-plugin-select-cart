import { registerPlugin } from '@pexip/plugin-api'
import { PLUGIN_ID } from './constants'
import { showDepartmentSelection, ToolbarButton } from './forms'

const plugin = await registerPlugin({
  id: PLUGIN_ID,
  version: 0
})

const toolbarButton = await plugin.ui.addButton(ToolbarButton)
toolbarButton.onClick.add(async () => {
  await showDepartmentSelection(plugin)
})
