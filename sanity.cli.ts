import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'cpe0lcma',
    dataset: 'production'
  },
  deployment: {
    appId: 'awu71ot5g9wnf9h5dy09g1uf',
    autoUpdates: true,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  
})
