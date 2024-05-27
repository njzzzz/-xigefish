# dataDirectory 使用说明

## 需要项目提供信息， []内的信息为作为表单设计器时必须存在 

1. @/api/entity [dictionaryEntity]
```javascript
// 若接口数据不符合下属属性则建议开启field映射 类似例子文件中的value label
// dictionary-item.js
export const dictionaryItemEntiry = {
  dictionaryId: { type: Number }, // 字典id
  dictionaryCode: {}, // 字典code
  id: { type: Number }, // 主键
  value: { field: 'itemValue' }, // 字典item值
  label: { field: 'name' }, // 字典item名称
  remark: {}, // 备注
  sequence: { type: Number } // 排序
}
   
// dictionary.js
import { dictionaryItemEntiry } from './dictionary-item.js'
export const dictionaryEntity = {
    id: { type: Number }, // 主键
    code: { }, // 字典code
    name: {}, // 字典名称
    remark: {}, // 备注,
    items: { type: [new Model(dictionaryItemEntiry)] }
}
```
2. @/api dictionaryService [dictionaryManageService]
    - dictionaryService 需要提供list方法 
    - dictionaryManageService 需要提供 page
