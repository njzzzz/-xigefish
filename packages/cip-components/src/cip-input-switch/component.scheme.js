
export const propsScheme = {
  modelValue: {
    type: [String, Number],
    intro: 'input框输入值'
  }
}

export const slotsScheme = {
  input: {
    cbVar: 'modelValue、updateModelValue、effective'
  }
}

export const componentScheme = {
  propsScheme,
  slotsScheme
}
