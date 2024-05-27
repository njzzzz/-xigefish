export const schemeToTableData = (scheme) => {
  return Object.keys(scheme).map(key => {
    const row = scheme[key] || {}
    return {
      key,
      intro: row.intro || '-',
      cbVar: row.cbVar,
      default: row.default
    }
  })
}
