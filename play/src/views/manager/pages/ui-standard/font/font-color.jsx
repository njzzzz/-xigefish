import ColorCard from '@/views/manager/pages/ui-standard/color/color-card'
import styles from './font.module.less'
const FontColor = (props) => {
  return <div class={styles['font-color']} style={{ display: 'flex', alignItems: 'center' }}>
    <ColorCard cssVar={props.cssVar} style={{ width: '220px', marginRight: '60px' }}></ColorCard>
    <div class={'font-14'}>
      <div style={{ color: 'var(--el-text-color-primary)' }}>{props.title}</div>
      <div style={{ color: 'var(--el-text-color-regular)' }}>{props.intro}</div>
    </div>
  </div>
}

FontColor.props = {
  cssVar: { type: String, required: true },
  title: String,
  intro: String
}

export default FontColor
