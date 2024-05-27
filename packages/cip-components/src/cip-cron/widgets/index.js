import SecondMinute from './second-minute'
import { h } from 'vue'
export const Minute = (props, { slots }) => h(SecondMinute, { ...props, valType: 'minute', label: '分' }, slots)
export const Second = (props, { slots }) => h(SecondMinute, { ...props, valType: 'second', label: '秒' }, slots)
export { default as Hour } from './hour'
export { default as Day } from './day'
export { default as Week } from './week'
export { default as Month } from './month'
export { default as Year } from './year'
