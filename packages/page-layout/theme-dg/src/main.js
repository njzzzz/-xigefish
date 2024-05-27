import { defineAsyncComponent } from 'vue'

const List = defineAsyncComponent(() => import('./list'))
const Handle = defineAsyncComponent(() => import('./handle'))
const LeftRight = defineAsyncComponent(() => import('./left-right'))
const Freedom = defineAsyncComponent(() => import('./freedom'))
export default {
  List,
  Handle,
  Freedom,
  LeftRight
}
