const statusOptions = [
  {
    label: '完成',
    value: 0,
    color: '#19CC96'
  },
  {
    label: '错误',
    value: 1,
    color: '#FF5B63'
  },
  {
    label: '告警',
    value: 2,
    color: '#FF8F33'
  },
  {
    label: '进行中',
    value: 3,
    color: '#3786FD'
  },
  {
    label: '未开始',
    value: 4,
    color: '#C0C0C0'
  }
]
export const tableEntity = {
  text: { type: 'input', label: '常规表头左对齐' },
  text1: { type: 'input', label: '表头' },
  text2: { type: 'input', label: '表头' },
  text3: { type: 'input', label: '表头' },
  text4: { type: 'input', label: '表头' },
  number: { type: 'number', label: '常规表头右对齐' },
  status: { type: 'status', options: statusOptions, label: '状态' },
  sortTextField: { type: 'input', label: '排序表头左对齐' },
  progress: { type: 'progress', label: '进度条' },
  switch: { type: 'switch', label: '开关' },
  sortNumberField: { type: 'number', label: '排序表头右对齐' },
  img: { type: 'string', label: '照片' }
}
