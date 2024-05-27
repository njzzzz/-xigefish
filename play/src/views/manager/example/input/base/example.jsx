import { ref } from 'vue'
import { Money } from '@element-plus/icons-vue'
import { ElSelect, ElOption } from 'element-plus'
import CipInput from '@xigefish/components/cip-input'
import CipForm from '@xigefish/d-render/cip-form'
export default {
  setup () {
    const sizes = [
      { value: 'small', label: '小尺寸' },
      { value: 'default', label: '中尺寸（默认）' },
      { value: 'large', label: '大尺寸' }
    ]
    const containerStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gridGap: '20px'
    }

    const item = ref({
      suffixValue: '984',
      objectValue: { label: '我是一个对象', value: 'testObject' }
    })

    return () => <div style={containerStyle}>
      {sizes.map(({ value, label }) => <div
        key={value}>
        {label}
        <CipInput size={value} />
      </div>)}

      <div>
        禁用
        <CipInput disabled modelValue={'智慧城市'} />
      </div>

      <div >
        前缀(有竖线)
        <CipInput v-model={item.value.suffixValue} clearable fixBorder={true}>
          {{
            prefix: () => <span >¥</span>
          }}
        </CipInput>
      </div>
      <div >
        前缀(无竖线)
        <CipInput v-model={item.value.suffixValue} clearable prefixIcon={Money}>
          {/* {{ */}
          {/*  prefix: () => <span >¥</span> */}
          {/* }} */}
        </CipInput>
      </div>
      <div >
        后缀(有竖线)
        <CipInput v-model={item.value.suffixValue} clearable fixBorder={true} suffixIcon={Money}>
          {/* {{ */}
          {/*  suffix: () => <span>RMB</span> */}
          {/* }} */}
        </CipInput>
      </div>
      <div>
        后缀(无竖线)
        <CipInput v-model={item.value.suffixValue} clearable>
          {{
            suffix: () => <span>RMB</span>
          }}
        </CipInput>
      </div>
      <div >
        后缀
        <CipInput modelValue={'杭州星光大道57号'}>
          {{
            prepend: () => <ElSelect modelValue={1} style={{ width: '76px' }}>
              <ElOption value={1} label={'浙江'} />
            </ElSelect>
          }}
        </CipInput>
      </div>
      <div >
        密码 【注：密码不可见图标与UI标准存在差异】
        <CipInput type={'password'} modelValue={'杭州星光大道57号'} show-password={true}/>
      </div>
      <div >
        加载中 【注：无加载中的功能】
        <CipInput loading={true}/>
      </div>
      <div >
        解释说明一 【注：无解释说明一功能】
        <CipInput />
      </div>
      <div >
        解释说明二 【注：无解释说明二功能】
        <CipInput />
      </div>
      <div style={{ gridArea: 'span 1 / span 3' }}>
        <CipForm
          labelPosition={'top'}
          v-model:model={item.value}
          grid={3}
          fieldList={[
            {
              key: 'description1',
              config: { label: '解释说明一', description: '解释说明一', placeholder: '请输入' }
            },
            {
              key: 'description2',
              config: { label: '解释说明二', description: '解释说明二', descriptionEffect: 'dark', placeholder: '请输入' }
            }
          ]}
        />
      </div>
      <div >
        对象值展示(非UI标准，仅测试对象值使用)
        <CipInput modelValue={item.value.objectValue}/>
      </div>
    </div>
  }
}
