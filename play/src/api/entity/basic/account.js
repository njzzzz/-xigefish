export const accountEntity = {
  // 其余数据随意 userName 为Main组件需要展示数据 如果用当前数据字段不符合请使用映射
  userName: { _renderConfig: { label: '用户昵称' } },
  id: {},
  username: { _renderConfig: { label: '用户名' } },
  pwd: { _renderConfig: { label: '密码', type: 'password' } },
  sex: { _renderConfig: { label: '性别', type: 'select', options: [{ value: 'M', label: '男' }, { value: 'F', label: '女' }] } },
  birthday: { _renderConfig: { label: '生日', type: 'date', formatter: 'YYYY-MM' } },
  status: { _renderConfig: { label: '状态', type: 'select', options: [{ value: 1, label: '正常' }, { value: 0, label: '冻结' }] } },
  createTime: { _renderConfig: { label: '创建日期', type: 'date', viewType: 'datetime' } },
  num: { _renderConfig: { label: '数字', type: 'number' } }
}
