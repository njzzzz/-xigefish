// 例：
// mode 可能参数为/index /view /mobile /configure
// test: (mode) => () => import(`@/components/hello-component${mode}`)
// test: {
//   component: (mode) => () => import(`@/components/hello-component${mode}`)
// }
// testLayout: {
//   component: (mode) => () => import(`@/components/hello-component${mode}`)
//   layout: true
// }

export default {
  status: () => () => import('@/components/custom-form-input/custom-status/view.jsx'),
  progress: () => () => import('@/components/custom-form-input/custom-progress/view.jsx'),
  checkTags: () => () => import('@/components/custom-form-input/custom-check-tags/index.jsx'),
  colorPicker: (mode) => () => import(`@/components/custom-form-input/color${mode}`),
  testInput: (mode) => () => import(`./input${mode}`)
}
