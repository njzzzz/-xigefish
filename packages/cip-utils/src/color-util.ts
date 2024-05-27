import { TinyColor } from '@ctrl/tinycolor'
import type {ColorInput} from '@ctrl/tinycolor'

export const setElPrimaryColor = (color: ColorInput, prefix: string = 'el') => {
  const _color = new TinyColor(color)
  document.body.style.setProperty(`--${prefix}-color-primary`, `${color}`);
  // 30 light-3
  [3, 5, 7, 8, 9].forEach(v => {
    const lightColor = _color.tint(v * 10).toHexString()
    document.body.style.setProperty(`--${prefix}-color-primary-light-${v}`, lightColor)
  });
  [2].forEach(v => {
    const darkColor = _color.darken(v * 10).toHexString()
    document.body.style.setProperty(`--${prefix}-color-primary-dark-${v}`, darkColor)
  })
}

export const setElColor = (type: 'primary' | string, color: ColorInput, prefix:string = 'el') => {
  const _color = new TinyColor(color)
  document.body.style.setProperty(`--${prefix}-color-${type}`, `${color}`);
  // 30 light-3
  [3, 5, 7, 8, 9].forEach(v => {
    const lightColor = _color.tint(v * 10).toHexString()
    document.body.style.setProperty(`--${prefix}-color-${type}-light-${v}`, lightColor)
  });
  [2].forEach(v => {
    const darkColor = _color.darken(v * 10).toHexString()
    document.body.style.setProperty(`--${prefix}-color-${type}-dark-${v}`, darkColor)
  })
}

export const getELColor = (type) => {
  console.log(`--el-color-${type}`, document.body.style.getPropertyValue(`--el-color-${type}`))
  return document.body.style.getPropertyValue(`--el-color-${type}`)
}
