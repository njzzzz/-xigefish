import CipButton from '@xigefish/components/cip-button'
import { CipButton as XdpButton } from '@xigefish/button'
import { Plus, Upload, Location, Guide } from '@element-plus/icons-vue'
export default {
  setup () {
    const types = [
      {
        value: 'primary',
        label: '主要按钮',
        children: [
          { slots: { default: () => '保存' } },
          { props: { icon: Plus }, slots: { default: () => '添加' } }]
      },
      {
        value: 'default',
        label: '次要按钮',
        children: [
          { slots: { default: () => '取消' } },
          { props: { icon: Upload }, slots: { default: () => '上传' } },
          { props: { square: true, icon: <Location/> } }
        ]
      },
      { value: 'danger', label: '危险按钮', children: [{ slots: { default: () => '停止' } }] },
      {
        value: '',
        label: '地图按钮',
        children: [
          { props: { icon: Guide, map: true }, slots: { default: () => '划线' } },
          { props: { square: true, map: true, icon: <Location/> } }
        ]
      }
    ]
    const sizes = [
      { value: 'small', label: '小尺寸' },
      { value: 'default', label: '中尺寸（默认）' },
      { value: 'large', label: '大尺寸' }
    ]
    return () => <>
      <div style={{ display: 'flex' }}>
        <XdpButton button-type="create">测试新增</XdpButton>
        {types.map(type => <div key={type.value} style={{ marginRight: '80px' }}>
          {type.label}
          {[undefined, true].map(disabled => <div key={disabled + ''} style={{ marginTop: '20px' }}>
            {type.children.map((config, index) =>
              <CipButton
                key={index}
                {...config.props}
                v-slots={config.slots}
                type={type.value}
                disabled={disabled}
              />
            )}
          </div>)}
        </div>)}
        <div style={{ paddingTop: '20px' }}>
          {sizes.map(size => <div key={size.value} >
            <div style={{ marginTop: '20px' }}>
              <span style={{ display: 'inline-block', width: '120px' }}>{size.label}</span>
              <CipButton size={size.value} type={'primary'}>保存</CipButton>
              <CipButton size={size.value} >取消</CipButton>
            </div>
          </div>)}
        </div>
      </div>
    </>
  }
}
