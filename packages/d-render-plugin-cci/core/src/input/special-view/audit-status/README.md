# auditStatus

> 审核展示组件(可选择性展示原因)

## Attributes

| 参数             | 说明        |             类型              | 可选值 | 默认值 |
|:---------------|:----------|:---------------------------:|:----|:----|
| modelValue     | 当前值       |                             |     | -   |
| formatter      | 格式化展示值    | function(modelValue,config) |     | -   |
| showOtherValue | 展示附加信息的条件 |     array/string/number     |     | -   |
| otherLabel     | 弹出框的标题    |           string            |     | -   |
| otherValue     | 弹出框的内容    |    object/string/number     |     | -   |

## example

```javascript
// 在cip-table中使用的配置
const statusConfig = {
  type: 'auditStatus',
  formatter: (modelValue, config) => {
    const { options } = config // 源自原始配置
    return options.find(option => option.value === modelValue)?.label
  },
  showOtherValue: [4, 7],
  otherLabel: '挂失原因',
  otherKey: 'loseReason',
  dependOn: ['status'],
  dynamic: true, // table中的dependOn要生效的话必须开启dynamic
  changeConfig: (config, { status }) => {
    if (status === 7) {
      config.otherLabel = '取消领取原因'
      config.otherKey = 'cancelReason'
    }
    return config
  }
}
```

## authors

- [xmf](mailto:xmf@citycloud.com.cn)
