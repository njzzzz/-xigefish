import { ElBadge, ElAvatar } from 'element-plus'
import ExampleRow from '@/components/example-row'
import HeadPng from './head.png'
export default {
  setup () {
    return () => <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flexGrow: 2 }}>
        <ExampleRow label={'无具体数字'}><ElBadge is-dot/></ExampleRow>
        <ExampleRow label={'个位数'}>  <ElBadge value={8}/></ExampleRow>
        <ExampleRow label={'多位数'}><ElBadge value={35}/></ExampleRow>
        <ExampleRow label={'最大数'}><ElBadge value={100} max={99}/> <ElBadge value={1000} max={999}/></ExampleRow>
        <ExampleRow label={'文本信息'}><ElBadge value={'NEW'}/></ExampleRow>
      </div>
      <div style={{ flexGrow: 2 }}>
        <ExampleRow label={'位置'}>
          <ElBadge is-dot>
            <ElAvatar shape={'square'} src={HeadPng}></ElAvatar>
          </ElBadge>
          <ElBadge value={35}>
            <ElAvatar style={{ marginLeft: '34px' }} shape={'square'} src={HeadPng}></ElAvatar>
          </ElBadge>
        </ExampleRow>
      </div>
    </div>
  }
}
