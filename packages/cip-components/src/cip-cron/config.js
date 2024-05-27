export const config = {
  tabs: [
    {
      name: '秒',
      value: 'second'
    },
    {
      name: '分',
      value: 'minute'
    },
    {
      name: '时',
      value: 'hour'
    },
    {
      name: '日',
      value: 'day'
    },
    {
      name: '月',
      value: 'month'
    },
    {
      name: '周',
      value: 'week'
    },
    {
      name: '年',
      value: 'year'
    }
  ],
  Seconds: {
    name: '秒',
    every: '每一秒钟',
    interval: ['每隔', '秒执行,从第', '秒开始'],
    specific: '指定秒数(可多选)',
    cycle: ['周期从', '到', '秒']
  },
  Minutes: {
    name: '分',
    every: '每一分钟',
    interval: ['每隔', '分执行,从第', '分开始'],
    specific: '指定分钟数(可多选)',
    cycle: ['周期从', '到', '分']
  },
  Hours: {
    name: '时',
    every: '每一小时',
    interval: ['每隔', '小时执行,从第', '小时开始'],
    specific: '指定小时数(可多选)',
    cycle: ['周期从', '到', '小时']
  },
  Days: {
    name: '日',
    every: '每一日',
    noTouch: '不指定',
    cycleDay: ['周期从 ', '到', '日'],
    intervalDay: ['每隔', '天执行 从', '天开始'],
    workDay: ['本月', '号最近的那个工作日'],
    lastDay: '在这个月的最后一天',
    specificDay: '指定(可多选)'
  },
  Month: {
    name: '月',
    every: '每一月',
    noTouch: '不指定',
    interval: ['每隔', '月执行 从', '月开始'],
    specific: '指定月数(可多选)',
    cycle: ['从', '到', '月之间的每个月']
  },
  Weeks: {
    name: '周',
    every: '每周',
    noTouch: '不指定',
    cycleWeek: ['周期从星期', '到星期'],
    loopWeek: ['从星期', '开始，每', '天执行一次'],
    intervalWeek: ['第', '周的星期'],
    lastWeek: '本月最后一个星期',
    specificWeek: '指定(可多选)'
  },
  Year: {
    name: '年',
    every: '每一年',
    noTouch: '不指定',
    interval: ['每隔', '年执行 从', '年开始'],
    specific: '具体年份(可多选)',
    cycle: ['从', '到', '年之间的每一年']
  },
  Save: '确定',
  Cancel: '取消'
}
