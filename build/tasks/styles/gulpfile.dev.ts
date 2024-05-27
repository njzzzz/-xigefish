import series from './gulpfile'
import {watch} from 'gulp'
const entry =  process.env.ENTRY_MODULE || 'cip-styles'
console.log('watch entry', entry)
watch(`../../../packages/${entry}/src/**`, series);

export default series
