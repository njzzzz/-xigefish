import UiStandardPage from '@/components/ui-standard-page'
import FontColor from './font-color'
import styles from './font.module.less'
export default {
  setup () {
    return () => <UiStandardPage title={'字体 · Font'}>
      <UiStandardPage.Block intro={`字体是界面设计中最基本的构成之一。
用户通过文字来理解内容和完成工作，科学的字体系统将大大提升用户的阅读体验及工作效率。`}
      />

      <UiStandardPage.Block
        title={'字体家族'}
        intro={'为了在不同系统下保持文字的易读性和可读性，我们在不同的系统下选用合适的字体。'}
      >
       <div style={{ color: 'var(--el-text-color-regular)' }}>
         <h4>1. Windows 系统下:</h4>
         <div>中文 —— 优先选择： <span class={styles['font-example']} style={{ fontFamily: 'Microsoft Yahei' }}>微软雅黑</span>， 备用选择： <span class={styles['font-example']} style={{ fontFamily: 'Source Han Sans' }}>思源黑体</span></div>
         <div>英文、数字 —— 优先选择： <span class={styles['font-example']} style={{ fontFamily: 'Robot' }}>Robot</span>， 备用选择： <span class={styles['font-example']} style={{ fontFamily: 'Arial' }}>Arial</span></div>
         <h4>2. MacOs 系统下:</h4>
         <div>中文 —— 优先选择： <span class={styles['font-example']} style={{ fontFamily: 'PingFang SC' }}>苹方(PingFang SC)</span>， 备用选择： <span class={styles['font-example']} style={{ fontFamily: 'Source Han Sans' }}>思源黑体</span></div>
         <div>英文、数字 —— 优先选择： <span class={styles['font-example']} style={{ fontFamily: 'Robot' }}>Robot</span>， 备用选择： <span class={styles['font-example']} style={{ fontFamily: 'Arial' }}>Arial</span></div>
       </div>
      </UiStandardPage.Block>

      <UiStandardPage.Block
        title={'字阶与行高'}
        intro={'字阶（front size）是指一系列有规律的不同尺寸的字体，行高（line height）可以理解为一个包裹在字体外面的无形的盒子。'}
        rules={['参考Ant Design对于行高的规范，line height=front size + 8']}
      >
        {[12, 14, 16, 18, 20, 24, 28, 32, 38, 42].map(size =>
          <div key={size} class={[`font-${size}`, styles['font-size__example']]} >font-size: {size}px (class: {`font-${size}`})</div>
        )}
      </UiStandardPage.Block>

      <UiStandardPage.Block
        title={'字重'}
        intro={'字重的选择同样基于秩序、稳定、克制的原则。多数情况下，只出现 regular 以及 medium 的两种字体重量。'}
      >
        <div class={'font-regular'}>regular(class: font-regular)</div>
        <div class={'font-medium'}>medium(class: font-medium)</div>
      </UiStandardPage.Block>

      <UiStandardPage.Block
        title={'字体颜色'}
        intro={'在字体颜色的选择上，我们选用以下颜色，并对对主、次信息做一定的规划。'}
      >
        <div>
          <FontColor cssVar={'--el-text-color-primary'} title={'用于重要文字信息'} intro={'如菜单标题、表单正文'}></FontColor>
          <FontColor cssVar={'--el-text-color-regular'} title={'用于次要文字信息'} intro={'如表单标签'}></FontColor>
          <FontColor cssVar={'--el-text-color-placeholder'} title={'用于次要文字信息'} intro={'如表单提示语'}></FontColor>
          <FontColor cssVar={'--el-text-color-disabled'} title={'用于辅助文字信息'} intro={'如不可用文字'}></FontColor>
        </div>
      </UiStandardPage.Block>

    </UiStandardPage>
  }
}
