import CommonLayout from './common-layout'
import { commonListProps } from '@xigefish/page-layout-shared'
export default {
  name: 'ListSupergravity',
  props: commonListProps,
  setup (props, { slots }) {
    const namespace = 'cip-page-layout'
    return () => <CommonLayout
      type={'list'}
      hideHeader={props.hideHeader}
      hideFooter={true}
      title={props.title}
      withTitle={props.withTitle}
      loading={props.loading}
      canBack={props.canBack}
      back={props.back}
    >

      {slots.filter && <div class={`${namespace}-list__filter`}>
        {slots.filter?.()}
      </div>}
      {(slots.handle || slots.title) && <div class={`${namespace}-list__table-title`}>
        <div class={`${namespace}-list__handle`}>
          {slots.handle?.()}
        </div>
        <div style="min-width: 200px">
          {slots.title?.()}
        </div>
      </div>}
      <div class={`${namespace}-list__content`}>
        {slots.default?.()}
        {slots.note?.()}
      </div>
      {slots.pagination && <div class={`${namespace}-list__pagination`}>
        {slots.pagination?.()}
      </div>}
    </CommonLayout>
  }
}
