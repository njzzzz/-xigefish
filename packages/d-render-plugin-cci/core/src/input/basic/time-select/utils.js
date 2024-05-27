
// 格式化时间
export const formatTime = (time) => {
  return (
    (time.hours < 10 ? '0' + time.hours : time.hours) +
    ':' +
    (time.minutes < 10 ? '0' + time.minutes : time.minutes)
  )
}
// 时间转换成分钟
export const parseTime = (time) => {
  const value = (time || '').split(':')
  if (value.length >= 2) {
    const hours = parseInt(value[0], 10)
    const minutes = parseInt(value[1], 10)
    return { hours, minutes }
  }
  return null
}
// 通过step计算下一步的时间
export const nextTime = (time, step) => {
  const timeValue = parseTime(time)
  const stepValue = parseTime(step)
  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  }
  next.minutes += stepValue.minutes
  next.hours += stepValue.hours
  next.hours += Math.floor(next.minutes / 60)
  next.minutes = next.minutes % 60
  return formatTime(next)
}
// 对比两个时间的大小
export const compareTime = (time1, time2) => {
  const value1 = parseTime(time1)
  const value2 = parseTime(time2)
  const minutes1 = value1.minutes + value1.hours * 60
  const minutes2 = value2.minutes + value2.hours * 60
  if (minutes1 === minutes2) return false
  return minutes1 > minutes2
}
