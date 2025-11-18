import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'
import {isISLocale} from '@sanity/locale-is-is'

export default defineConfig({
  name: 'default',
  title: 'Skipulagsfræðingafélag Íslands',

  projectId: 'cpe0lcma',
  dataset: 'production',

  plugins: [
    structureTool({structure: deskStructure}), 
    visionTool(),
    isISLocale(
      {title: 'Íslenska'}
    ),
  ],

  schema: {
    types: schemaTypes,
  },
})
