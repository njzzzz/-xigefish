export const configProvideProps = {
  searchReset: {
    type: Boolean,
    default: false
  },
  searchGrid: {
    type: [Boolean, Number],
    default: undefined
  },
  buttonConfigMap: Object, // 用于cip-button全局配置 Record<string, {type: string ,icon: string , text: string}>
  paginationCompact: Boolean, // 用于cip-pagination是否开启紧凑模式(注: 数据中台使用紧凑模式)
  customInputComponents: Object,
  withQuery: { // tabs判断路由相同时是否包含query
    type: Boolean,
    default: undefined
  },
  fileUpload: Function, // 默认的文件上传方法 需要使用file组件时建议填写
  defaultViewValue: { // 默认值全局配置
    type: [String, Number]
  },
  namespace: { // 样式命名空间
    type: String,
    default: 'el'
  }
}
