import { ref, reactive, watch, watchEffect } from 'vue'

export const useCronItem = (props, { emit }) => {
  const type = ref('1')
  const data = reactive({
    cycle: { // 周期
      start: 0,
      end: 0
    },
    loop: { // 循环
      start: 0,
      end: 0
    },
    week: { // 指定周
      start: 0,
      end: 0
    },
    work: 0,
    last: 0,
    appoint: [] // 指定
  })

  const splitAndParseInt = (str, splitKey) => {
    return str.split(splitKey).map(v => Number(v))
  }

  const updateVal = () => {
    if (!props.modelValue) return
    if (props.modelValue === '?') {
      type.value = '5'
    } else if (props.modelValue.indexOf('-') !== -1) {
      const arr = splitAndParseInt(props.modelValue, '-') // props.modelValue.split('-')
      if (arr.length === 2) {
        type.value = '2'
        data.cycle.start = arr[0]
        data.cycle.end = arr[1]
      }
    } else if (props.modelValue.indexOf('/') !== -1) {
      const arr = splitAndParseInt(props.modelValue, '/')// props.modelValue.split('/')
      if (arr.length === 2) {
        type.value = '3'
        data.loop.start = arr[0]
        data.loop.end = arr[1]
      }
    } else if (props.modelValue.indexOf('*') !== -1) {
      type.value = '1'
    } else if (props.modelValue.indexOf('L') !== -1) {
      type.value = '6'
      data.last = props.modelValue.replace('L', '')
    } else if (props.modelValue.indexOf('#') !== -1) {
      const arr = splitAndParseInt(props.modelValue, '#') // props.modelValue.split('#')
      if (arr.length === 2) {
        type.value = '7'
        data.week.start = arr[0]
        data.week.end = arr[1]
      }
    } else if (props.modelValue.indexOf('W') !== -1) {
      type.value = '8'
      data.work = props.modelValue.replace('W', '')
    } else if (props.modelValue === ' ') {
      type.value = '9'
    } else {
      type.value = '4'
      data.appoint = props.modelValue.split(',')
    }
  }
  // 第一次进入需要直接分析
  updateVal()

  const currentText = ref(props.modelValue)

  watch(() => props.modelValue, () => {
    if (currentText.value !== props.modelValue) {
      // currentText.value = props.modelValue
      updateVal()
    }
  }, { flush: 'pre' })

  watchEffect(() => {
    const result = []
    switch (type.value) {
      case '1': // 每秒
        result.push('*')
        break
      case '2': // 年期
        result.push(`${data.cycle.start}-${data.cycle.end}`)
        break
      case '3': // 循环
        result.push(`${data.loop.start}/${data.loop.end}`)
        break
      case '4': // 指定
        if (data.appoint.length === 0) {
          result.push('*')
        } else {
          result.push(data.appoint.join(','))
        }
        break
      case '6': // 最后
        result.push(`${data.last === 0 ? '' : data.last}L`)
        break
      case '7': // 指定周
        result.push(`${data.week.start}#${data.week.end}`)
        break
      case '8': // 工作日
        result.push(`${data.work}W`)
        break
      case '9':
        result.push(' ')
        break
      default: // 不指定
        result.push('?')
        break
    };
    const text = result.join('')
    currentText.value = text
    if (props.modelValue !== text) {
      emit('update:modelValue', text)
    }
  }, { flush: 'post' })

  return {
    data, type
  }
}
