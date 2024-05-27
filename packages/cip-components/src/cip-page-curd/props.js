export default {
  layoutAttrs: {},
  layoutNoPadding: {}, // 布局组件是否不需要padding
  layoutCompact: {},
  layoutTheme: {},
  searchAttrs: {}, // 搜索栏的其他参数
  searchCompleteRow: { type: Boolean, default: undefined }, // 非展开时是否完整的一行
  searchFieldList: {},
  defaultSearchFilter: {},
  dialogWidth: {},
  dialogSize: {},
  tableColumns: {},
  tableDefaultLimit: Number, // table分页的条数 【注： 仅进入时生效】
  tableRowKey: [String, Function],
  tableTreeProps: Object,
  withSearch: {
    type: Boolean,
    default: true
  },
  hideSearchButton: Boolean,
  withIndex: {
    type: Boolean,
    default: true
  },
  withTableHandle: {
    type: Boolean,
    default: true
  },
  withHandle: {
    type: Boolean,
    default: true
  },
  withCreate: { // 新建按钮
    type: Boolean,
    default: true
  },
  batchDelete: { // 批量删除
    type: Boolean,
    default: false
  },
  tableSelectType: {
    type: String
  },
  tableSelectable: Function,
  tableAttrs: { type: Object, default: () => ({}) },
  permission: { type: Object, default: () => ({}) }, // 权限控制
  tableHandleWidth: {
    type: String
    // default: '135px'
  },
  withTableDeleteButton: { type: Boolean, default: true },
  judgeTableDeleteButtonFn: { type: Function },
  judgeTableDeleteButtonDisabledFn: { type: Function },
  judgeTableEditButtonDisabledFn: { type: Function },
  formLabelWidth: String,
  formFieldList: Array,
  formGrid: { default: 1 }, // [Number, Boolean]
  updateFormFieldList: Array,
  formLabelSuffix: String, // 表单域标签的后缀
  entity: {},
  itemType: {},
  curdFn: {},
  fetchInfo: Boolean, // 查看和编辑时是否开启fetch
  componentData: {
    type: Object
  },
  // 作为选择组件的一部分
  checkRow: {
    type: [Object, Array]
  },
  checkType: { // radio, checkbox
    type: String,
    validate: (val) => {
      return ['radio', 'checkbox'].includes(val)
    }
  },
  outParams: { type: Object },
  defaultExpandAll: { type: Boolean },
  withPagination: {
    type: Boolean,
    default: true
  },
  pageSizes: { type: Array },
  paginationConfig: { type: Object, default: () => ({}) },
  autoSelected: {
    type: Boolean,
    default: false
  },
  simpleSearchModel: Boolean // 单个查询模式
}
