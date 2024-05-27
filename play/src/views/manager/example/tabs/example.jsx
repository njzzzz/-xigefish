import { ref } from 'vue'
import { ElBadge, ElRadioGroup, ElRadioButton } from 'element-plus'
import CipTabs from '@xigefish/components/cip-tabs-plus'
import CipTabPane from '@xigefish/components/cip-tabs-plus/tab'

import './index.less'

export default {
  setup () {
    const active = ref('1')

    return () => (
      <div class='cip-tabs-example'>
        <h3>二级页签</h3>
        <div>默认样式</div>
        <CipTabs>
          <CipTabPane label="页签选中"></CipTabPane>
          <CipTabPane label="页签默认"></CipTabPane>
          <CipTabPane label="页签悬浮"></CipTabPane>
          <CipTabPane label="页签禁用" disabled></CipTabPane>
        </CipTabs>

        <div>带数字（默认）</div>
        <CipTabs>
          <CipTabPane label={`页签选中 (${3})`}></CipTabPane>
          <CipTabPane label={`页签默认 (${8})`}></CipTabPane>
          <CipTabPane label={`页签默认 (${12})`}></CipTabPane>
          <CipTabPane label={`页签默认 (${4})`}></CipTabPane>
        </CipTabs>

        <div>带数字（强调新消息）</div>
        <CipTabs>
          <CipTabPane label="页签选中"></CipTabPane>
          <CipTabPane label="页签默认">
            {{
              label: () => <div>
                <span>页签默认</span>
                <ElBadge value={35}></ElBadge>
              </div>
            }}
          </CipTabPane>
          <CipTabPane label="页签默认">
            {{
              label: () => <div>
                <span>页签默认</span>
                <ElBadge value={8}></ElBadge>
              </div>
            }}
          </CipTabPane>
          <CipTabPane label="页签默认"></CipTabPane>
        </CipTabs>

        <div>更多页签</div>
        <CipTabs v-model={active.value} tabPosition="top">
          <CipTabPane label="页签-1" name="1">页签-1</CipTabPane>
          <CipTabPane label="页签-2" name="2"></CipTabPane>
          <CipTabPane label="页签-3" name="3"></CipTabPane>
          <CipTabPane label="页签-4" name="4" disabled></CipTabPane>
          <CipTabPane label="页签-5" name="5"></CipTabPane>
          <CipTabPane label="页签-6" name="6"></CipTabPane>
          <CipTabPane label="页签-7" name="7"></CipTabPane>
          <CipTabPane label="页签-8" name="8" disabled></CipTabPane>
          <CipTabPane label="页签-9" name="9"></CipTabPane>
          <CipTabPane label="页签-10" name="10"></CipTabPane>
          <CipTabPane label="页签-11" name="11"></CipTabPane>
          <CipTabPane label="页签-12" name="12" disabled></CipTabPane>
          <CipTabPane label="页签-13" name="13"></CipTabPane>
          <CipTabPane label="页签-14" name="14"></CipTabPane>
          <CipTabPane label="页签-15" name="15"></CipTabPane>
          <CipTabPane label="页签-16" name="16" disabled></CipTabPane>
          <CipTabPane label="页签-17" name="17"></CipTabPane>
          <CipTabPane label="页签-18" name="18"></CipTabPane>
          <CipTabPane label="页签-19" name="19"></CipTabPane>
          <CipTabPane label="页签-20" name="20" disabled></CipTabPane>
        </CipTabs>

        <br />
        <div>更多页签（纵向）</div>
        <CipTabs v-model={active.value} tabPosition="left" height="300px">
          <CipTabPane label="页签-1" name="1">页签-1</CipTabPane>
          <CipTabPane label="页签-2" name="2"></CipTabPane>
          <CipTabPane label="页签-3" name="3"></CipTabPane>
          <CipTabPane label="页签-4" name="4" disabled></CipTabPane>
          <CipTabPane label="页签-5" name="5"></CipTabPane>
          <CipTabPane label="页签-6" name="6"></CipTabPane>
          <CipTabPane label="页签-7" name="7"></CipTabPane>
          <CipTabPane label="页签-8" name="8" disabled></CipTabPane>
          <CipTabPane label="页签-9" name="9"></CipTabPane>
          <CipTabPane label="页签-10" name="10"></CipTabPane>
          <CipTabPane label="页签-11" name="11"></CipTabPane>
          <CipTabPane label="页签-12" name="12" disabled></CipTabPane>
          <CipTabPane label="页签-13" name="13"></CipTabPane>
          <CipTabPane label="页签-14" name="14"></CipTabPane>
          <CipTabPane label="页签-15" name="15"></CipTabPane>
          <CipTabPane label="页签-16" name="16" disabled></CipTabPane>
          <CipTabPane label="页签-17" name="17"></CipTabPane>
          <CipTabPane label="页签-18" name="18"></CipTabPane>
          <CipTabPane label="页签-19" name="19"></CipTabPane>
          <CipTabPane label="页签-20" name="20" disabled></CipTabPane>
        </CipTabs>

        <h3>三级页签</h3>
        <div>默认样式</div>
        <ElRadioGroup modelValue={1}>
          <ElRadioButton label={1}>页签选中</ElRadioButton>
          <ElRadioButton>页签默认</ElRadioButton>
          <ElRadioButton>页签悬浮</ElRadioButton>
          <ElRadioButton disabled>页签禁用</ElRadioButton>
        </ElRadioGroup>

        <div>带数字（默认）</div>
        <ElRadioGroup modelValue={1}>
          <ElRadioButton label={1}>页签选中 (3)</ElRadioButton>
          <ElRadioButton>页签默认 (8)</ElRadioButton>
          <ElRadioButton>页签默认 (12)</ElRadioButton>
          <ElRadioButton>页签默认 (4)</ElRadioButton>
        </ElRadioGroup>

        <div>小尺寸</div>
        <ElRadioGroup modelValue={1}>
          <ElRadioButton size="small" label={1}>页签选中</ElRadioButton>
          <ElRadioButton size="small">页签默认</ElRadioButton>
          <ElRadioButton size="small">页签默认</ElRadioButton>
          <ElRadioButton size="small">页签默认</ElRadioButton>
        </ElRadioGroup>
      </div>
    )
  }
}
