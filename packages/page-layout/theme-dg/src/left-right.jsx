// 默认为左侧固定，右侧自由伸缩
import { ElScrollbar } from 'element-plus'
import { usePageLayout, useSetPageConfig, commonLeftRightProps } from '@xigefish/page-layout-shared'
import CommonLayout from './common-layout'
export default {
  name: 'LeftRightDg',
  props: commonLeftRightProps,
  setup (props, { slots }) {
    const { inPageLayout } = usePageLayout()
    // const cipConfig = useCipConfig()

    // 控制back按钮出现的位置，title对应出现在title前面，breadcrumb对应出现在面包屑前面
    const namespace = 'cip-page-layout'
    useSetPageConfig({ table: {}, searchForm: {} })
    return () => <div class={[`${namespace}-left-right--gd`, 'cip-page-layout--dg', { 'in-page-layout': inPageLayout.value }]}>
      <div class={[`${namespace}-left-right__left`, { [`${namespace}-left-right__divider`]: props.divider }]} style={props.leftStyle}>
        <CommonLayout
          type={'left-right'}
          hideFooter={true}
          canBack={props.canBack}
          back={props.back}
          title={props.title}
          withTitle={props.withTitle}
          loading={props.loading}
          ignoreParentLayout={true}
        >
          {{
            default: () => <ElScrollbar>{slots.left?.()}</ElScrollbar>
          }}
        </CommonLayout>
        {/* <ElScrollbar> */}
        {/*  {!usingHideHeader.value && <div class={['cip-page-layout-left-right__breadcrumb', 'cip-page-layout__breadcrumb']}> */}
        {/*    { */}
        {/*      canBackBridge.value && backPosition.value === 'breadcrumb' && <BackButton class={`${namespace}__back-button`} onClick={() => onBack()}/> */}
        {/*    } */}
        {/*    <CipBreadcrumb canBack={false}/> */}
        {/*  </div>} */}
        {/*  {withTitleBridge.value && <div class={`${namespace}__title__container`}> */}
        {/*    { canBackBridge.value && backPosition.value === 'title' && <BackButton class={`${namespace}__back-button`} onClick={() => onBack()}/>} */}
        {/*    <div class={[ */}
        {/*      `${namespace}-left-right__title font-bold font-18`, */}
        {/*      `${namespace}__title` */}
        {/*    ]}> */}
        {/*      {titleBridge.value} */}
        {/*    </div></div>} */}
        {/*  {slots.left?.()} */}
        {/* </ElScrollbar> */}
      </div>
      <div class={`${namespace}-left-right__right layout-overflow-auto`} style={props.rightStyle}>{slots.default?.()}</div>
    </div>
  }
}
