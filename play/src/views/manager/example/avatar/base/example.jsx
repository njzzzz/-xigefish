import { ElBadge } from 'element-plus'
import CipAvatar from '@xigefish/components/cip-avatar'
import ExampleRow from '@/components/example-row'
import avatar1 from '@/assets/images/avatar_1.png'
import avatar2 from '@/assets/images/avatar_2.png'
import avatar3 from '@/assets/images/avatar_3.png'
import avatar4 from '@/assets/images/avatar_4.png'
import avatar5 from '@/assets/images/avatar_5.png'
import avatar6 from '@/assets/images/avatar_6.png'
import avatar7 from '@/assets/images/avatar_7.png'
import avatar8 from '@/assets/images/avatar_8.png'
import avatar9 from '@/assets/images/avatar_9.png'
import avatar10 from '@/assets/images/avatar_10.png'
import avatar11 from '@/assets/images/avatar_11.png'
import avatar12 from '@/assets/images/avatar_12.png'
import avatar13 from '@/assets/images/avatar_13.png'

export default {
  setup () {
    const commonStyle = { height: '32px', width: '32px' }
    return () => <>
      <div>• 头像形状分为圆形和方形，默认为圆形头像，在排版需要的情况下可使用方形头像。</div>
      <div>• 头像尺寸可根据位置场景自定义</div>
      <div style='display: flex;'>
        <div style='flex: 1;'>
          <ExampleRow label='默认头像'>
            <CipAvatar style='margin-right: 28px;'/>
            <CipAvatar shape="square" />
          </ExampleRow>
          <ExampleRow label='默认头像'>
            <CipAvatar style={{ marginRight: '28px', ...commonStyle }} src={avatar1}></CipAvatar>
            <CipAvatar style={commonStyle} shape="square" src={avatar2}></CipAvatar>
          </ExampleRow>
          <ExampleRow label='默认头像'>
            <CipAvatar style={{ marginRight: '28px', ...commonStyle }} src={avatar3}></CipAvatar>
            <CipAvatar style={commonStyle} shape="square" src={avatar4}></CipAvatar>
          </ExampleRow>
          <ExampleRow label='字符头像'>
            <CipAvatar style={{ marginRight: '28px', ...commonStyle }} src={avatar10}></CipAvatar>
            <CipAvatar style={{ marginRight: '28px', ...commonStyle }} shape="square" src={avatar11}></CipAvatar>
            <CipAvatar style={{ marginRight: '28px', ...commonStyle }} src={avatar12}></CipAvatar>
            <CipAvatar style={commonStyle} shape="square" src={avatar13}></CipAvatar>
          </ExampleRow>
        </div>
        <div style='flex: 1;'>
          <ExampleRow label='头像消息'>
            <ElBadge style='margin-right: 28px;' is-dot><CipAvatar style={commonStyle} src={avatar3}></CipAvatar></ElBadge>
            <ElBadge value={35}><CipAvatar style={commonStyle} src={avatar3}></CipAvatar></ElBadge>
          </ExampleRow>
          <ExampleRow label='头像组合'>
            <CipAvatar style={commonStyle} src={avatar6}></CipAvatar>
            <CipAvatar style={commonStyle} src={avatar7}></CipAvatar>
            <CipAvatar style={commonStyle} src={avatar8}></CipAvatar>
            <CipAvatar style={commonStyle} src={avatar9}></CipAvatar>
          </ExampleRow>
          <ExampleRow label='其他形状'>
            <CipAvatar
              shape="square"
              src={avatar5}
              style="height: 87px;width: 66px;"
            ></CipAvatar>
          </ExampleRow>
        </div>
      </div>
    </>
  }
}
