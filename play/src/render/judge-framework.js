// 判断是否需要加在 framework
export const judgeFramework = () => {
  if (window.__POWERED_BY_QIANKUN__) return false
  if (self !== top) return false
  return true
}
