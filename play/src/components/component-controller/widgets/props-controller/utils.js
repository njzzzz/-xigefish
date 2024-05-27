import { isArray } from '@xigefish/d-render-shared'
export const schemeToTableData = (scheme) => {
  return Object.keys(scheme).map(key => {
    const row = scheme[key] || {}
    let { type } = row
    if (isArray(type) && type[0]) {
      type = type.map(v => v.name).join(' | ')
    } else {
      type = type?.name
    }
    return {
      key,
      intro: row.intro || '-',
      type: type,
      required: row.required,
      options: row.options,
      default: row.default
    }
  })
}
