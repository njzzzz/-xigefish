import Component from './component'
import { EditorOutline } from '@xigefish/d-render-design/svg'
import { h } from 'vue'
import { ModulePlugin } from '../plugin'
export class StructurePlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = Component
    this.config = { name: 'structure', title: '结构', icon: h(EditorOutline) }
  }
}
