import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'hom86msj',
    dataset: 'production',
  },
  deployment: {
    appId: 'cx9xmm1gxm3krd9zlgrni4y8',
    autoUpdates: true,
  },
})
