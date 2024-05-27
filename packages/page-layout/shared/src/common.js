export const pageLayoutCommonProps = {
  withTitle: { type: Boolean, default: undefined },
  title: String, // 原info版本支持
  loading: Boolean,
  canBack: { type: Boolean, default: undefined },
  hideHeader: { type: Boolean, default: undefined },
  back: { type: Function, default: undefined }
}
export const commonHandleProps = {
  ...pageLayoutCommonProps,
  onConfirm: Function,
  top: { type: Boolean, default: undefined }, // 将操作栏放到title
  hideHeader: { type: Boolean, default: undefined },
  hideHandler: { type: Boolean, default: undefined }
}
export const commonListProps = {
  ...pageLayoutCommonProps,
  noPadding: { type: Boolean, default: undefined },
  padding: { type: Boolean, default: undefined },
  compact: { type: Boolean, default: undefined } // 仅standard支持
}
export const commonLeftRightProps = {
  ...pageLayoutCommonProps,
  leftStyle: [Object, String],
  rightStyle: [Object, String],
  divider: { type: Boolean, default: true }
}

// handle
//  - standard width
// list
//  - common noPadding padding compact
