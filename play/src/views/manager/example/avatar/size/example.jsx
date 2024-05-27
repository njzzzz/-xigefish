import CipAvatar from '@xigefish/components/cip-avatar'
import ExampleRow from '@/components/example-row'
import avatar10 from '@/assets/images/avatar_10.png'
import avatar11 from '@/assets/images/avatar_11.png'

export default {
  setup () {
    const commonStyle = { marginRight: '28px' }
    const sizes = ['small', 'default', 'large']
    const numberSizes = [16, 32, 48]

    return () => (
      <div>
        <ExampleRow label="控制Icon头像的尺寸">
          <div style='display: flex;'>
            <div style='flex: 1;'>
              {sizes.map((size) => <CipAvatar size={size} style={{ marginRight: '28px' }} />)}
            </div>
            <div style='flex: 1'>
              {sizes.map((size) => <CipAvatar shape="square" size={size} style={{ marginRight: '28px' }} />)}
            </div>
          </div>
        </ExampleRow>
        <ExampleRow label="控制文字头像的尺寸">
          <div style='display: flex;'>
            <div style='flex: 1'>
              {sizes.map((size) => <CipAvatar size={size} style={{ marginRight: '28px', background: 'orange' }}>1</CipAvatar>)}
            </div>
            <div style='flex: 1'>
              {sizes.map((size) => (
              <CipAvatar
                shape="square"
                size={size}
                style={{ marginRight: '28px', background: 'orange' }}
              >2</CipAvatar>))}
            </div>
          </div>
        </ExampleRow>
        <ExampleRow label="size属性值类型为String">
          <div style='display: flex;'>
            <div style='flex: 1'>
              {sizes.map((size) => (
              <CipAvatar
                size={size}
                style={commonStyle}
                src={avatar10}
              ></CipAvatar>))}
            </div>
            <div style='flex: 1'>
              {sizes.map((size) => (
              <CipAvatar
                size={size}
                style={commonStyle}
                shape="square"
                src={avatar11}
              ></CipAvatar>))}
            </div>
          </div>
        </ExampleRow>
        <ExampleRow label="size属性值类型为Number">
          <div style="display: flex;">
            <div style="flex: 1;">
              {numberSizes.map((size) => (
              <CipAvatar
                size={size}
                style={commonStyle}
                src={avatar10}
              ></CipAvatar>))}
            </div>
            <div style="flex: 1;">
              {numberSizes.map((size) => (
              <CipAvatar
                size={size}
                style={commonStyle}
                shape="square"
                src={avatar11}
              ></CipAvatar>))}
            </div>
          </div>
        </ExampleRow>
        <ExampleRow label="自己设置样式height、width控制头像尺寸">
          <CipAvatar
            style="height: 100px;width: 80px;"
            shape="square"
            src={avatar11}
          ></CipAvatar>
        </ExampleRow>
      </div>
    )
  }
}
