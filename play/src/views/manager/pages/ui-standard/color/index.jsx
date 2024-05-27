import ColorsCard from './colors-card'
import UiStandardPage from '@/components/ui-standard-page'
export default {
  setup () {
    return () => <UiStandardPage title={['颜色', 'colour']}>
      <UiStandardPage.Block intro={'我们通过颜色来有目的地展示产品的功能、层次和风格。为了更好的实现页面及页面间的平衡与和谐，我们从以下几个方面构建色彩体系。'}/>

      <UiStandardPage.Block
        title={'品牌色'}
        intro={'当前品牌色取自基础色板的蓝色，Hex 值为 #3786FD'}
      >
        <ColorsCard type={'primary'}/>
      </UiStandardPage.Block>

      <UiStandardPage.Block
        title={'功能色'}
        intro={'功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。'}
      >
        {
          ['danger', 'warning', 'success', 'info']
            .map(type => <ColorsCard key={type} type={type}/>)
        }
      </UiStandardPage.Block>
    </UiStandardPage>
  }
}
