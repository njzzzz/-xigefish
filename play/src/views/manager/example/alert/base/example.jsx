import { ElAlert, ElLink } from 'element-plus'

export default {
  setup () {
    return () => <div style={{height: '200px', display: 'flex', flexDirection: 'column',  justifyContent: 'space-around'}}>
      <ElAlert type="warning" closable={false} show-icon>
        {{
          title: () => <div style={{display: 'flex', alignItems: 'center'}}>告警消息提示&nbsp;&nbsp;&nbsp;&nbsp;<ElLink type="primary" style={{fontSize: '12px'}}>操作</ElLink></div>
        }}
      </ElAlert>
      <ElAlert type="error" closable={false} show-icon>
        {{
          title: () => <div style={{display: 'flex', alignItems: 'center'}}>错误消息提示&nbsp;&nbsp;&nbsp;&nbsp;<ElLink type="primary" style={{fontSize: '12px'}}>操作</ElLink></div>
        }}
      </ElAlert>
      <ElAlert type="info" show-icon>
        {{
          title: () => <div class='el-alert-info__title'>普通消息提示</div>
        }}
      </ElAlert>
    </div>
  }
}
