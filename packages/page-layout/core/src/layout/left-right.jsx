import Layout from './index'
export default {
  setup (props, { slots }) {
    return () => <Layout type={'LeftRight'} v-slots={slots}/>
  }
}
