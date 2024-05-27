import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
import { accountEntity } from '@/api/entity'
export const formFieldList = generateFieldList(defineFormFieldConfig({
  username: { required: true },
  pwd: { required: true },
  sex: {},
  birthday: { }
}), accountEntity)
