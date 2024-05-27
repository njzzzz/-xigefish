export const basicOptions = [
  {
    id: '1',
    label: '第一层级',
    value: 'text',
    children: [
      {
        id: '2',
        label: '第二层级',
        value: '第二层级1',
        children: [
          {
            id: '3',
            label: '第三层级',
            value: '第三层级1'
          },
          {
            id: '4',
            label: '第三层级',
            value: '第三层级2'
          },
          {
            id: '5',
            label: '第三层级',
            value: '第三层级1',
            disabled: true
          }
        ]
      }
    ]
  }, {
    id: '6',
    label: '第一层级',
    value: 'text1',
    children: [
      {
        id: '7',
        label: '第二层级',
        value: 'text2'
      }
    ]
  }, {
    id: '8',
    label: '第一层级',
    value: 'text21',
    children: [
      {
        id: '9',
        label: '第二层级',
        value: 'text22'
      }
    ]
  }
]
