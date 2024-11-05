import { registerPlugin } from '@pexip/plugin-api'

const plugin = await registerPlugin({
  id: 'plugin-template', // TODO: Change this to a unique ID for your plugin
  version: 0
})

await plugin.ui.showToast({ message: 'Hello, world!' })
