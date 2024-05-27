import Layout from './index'
export default {
  setup (props, { slots }) {
    return () => <Layout type={'Freedom'} v-slots={slots}/>
  }
}
