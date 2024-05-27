import Layout from './index'
export default {
  setup (props, { slots }) {
    return () => <Layout type={'Handle'} v-slots={slots}/>
  }
}
