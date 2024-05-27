import { defineAsyncComponent } from 'vue'

const List = defineAsyncComponent(() => import('./list'))
const Handle = defineAsyncComponent(() => import('./handle'))
const LeftRight = defineAsyncComponent(() => import('./left-right'))

export default {
  List,
  Handle,
  Freedom: Handle,
  LeftRight
}
