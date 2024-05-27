import CommonLayout from './common-layout'
import { commonListProps } from '@xigefish/page-layout-shared'
// 无bg
export default {
  name: 'Freedom',
  props: commonListProps,
  setup (props, { slots }) {
    return () => <CommonLayout
      type={'freedom'}
      hideFooter={true}
      title={props.title}
      withTitle={props.withTitle}
      loading={props.loading}
      canBack={props.canBack}
      back={props.back}
    >
      {slots.default?.()}
    </CommonLayout>
  }
}
