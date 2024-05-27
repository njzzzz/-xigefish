import CipSteps from '@xigefish/components/cip-steps'
import { ref } from 'vue'

import './index.less'

export default {
  setup () {
    const active = ref(1)
    return () => (
      <div class='cip-steps-example'>
        <h3>步骤条</h3>
        <div class="cip-steps-example__title">基础样式</div>
        <CipSteps active={active.value}>
          <CipSteps.Step title="处理完成"></CipSteps.Step>
          <CipSteps.Step title="正在处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
        </CipSteps>

        <div class="cip-steps-example__title">带描述信息</div>
        <CipSteps active={active.value}>
          <CipSteps.Step title="处理完成" description="描述信息"></CipSteps.Step>
          <CipSteps.Step title="正在处理" description="描述信息"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
        </CipSteps>

        <div class="cip-steps-example__title">运行错误</div>
        <CipSteps active={active.value}>
          <CipSteps.Step title="处理完成"></CipSteps.Step>
          <CipSteps.Step title="问题信息" status="error"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
        </CipSteps>

        <div class="cip-steps-example__title">样式二（文字背景默认白色，用来遮挡横线，请根据实际情况修改.el-steps.title-up .el-step__main的背景色）</div>
        <CipSteps active={active.value} titleUp={true}>
          <CipSteps.Step title="处理完成"></CipSteps.Step>
          <CipSteps.Step title="正在处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
        </CipSteps>

        <div class="cip-steps-example__title">纵向样式</div>
        <CipSteps active={active.value} direction="vertical" style={{ height: '300px' }}>
          <CipSteps.Step title="处理完成"></CipSteps.Step>
          <CipSteps.Step title="正在处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
        </CipSteps>

        <div class="cip-steps-example__title">简介风格</div>
        <CipSteps active={active.value} simple>
          <CipSteps.Step title="处理完成"></CipSteps.Step>
          <CipSteps.Step title="正在处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
          <CipSteps.Step title="等待处理"></CipSteps.Step>
        </CipSteps>
      </div>
    )
  }
}
