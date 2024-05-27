import Layout from './index'
export default {
  setup (props, { slots }) {
    return () => <Layout type={'List'} v-slots={slots}/>
  }
}
