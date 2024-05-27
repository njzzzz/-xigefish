import CipButtonText from '@xigefish/components/cip-button-text'
import { Plus } from '@element-plus/icons-vue'
export default {
  setup () {
    const types = [
      {
        value: 'primary',
        label: '主要链接',
        children: [
          { type: 'primary', slots: { default: () => '主要链接' } }
        ]
      },
      {
        value: 'default',
        label: '普通链接',
        children: [
          { slots: { default: () => '普通链接' } }
        ]
      },
      { value: 'danger', label: '危险链接(表格中删除按钮使用的配色为primary)', children: [{ slots: { default: () => '危险链接' } }] },
      { value: 'default', label: '带图标链接', children: [{ props: { icon: Plus }, slots: { default: () => '带图标链接' } }] }
    ]

    return () => <>
      <div style={{ display: 'flex' }}>
        {types.map(type => <div key={type.value} style={{ marginRight: '80px' }}>
          {type.label}
          {[undefined, true].map(disabled => <div key={disabled + ''} style={{ marginTop: '20px' }}>
            {type.children.map((config, index) =>
              <CipButtonText
                key={index}
                {...config.props}
                v-slots={config.slots}
                type={type.value}
                disabled={disabled}
              />
            )}
          </div>)}
        </div>)}
      </div>
    </>
  }
}
