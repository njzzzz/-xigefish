import { configMapToList, defineSearchFieldConfig } from '@xigefish/d-render-shared'

export const generateSearchFieldList = (num) => {
  const config = {}
  for (let i = 0; i < num; i++) {
    config[`name${i}`] = { type: 'input', label: `姓名${i}` }
  }
  return configMapToList(defineSearchFieldConfig(config))
}
