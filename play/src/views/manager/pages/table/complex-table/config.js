import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList({
  classId: {
    label: '班号'
  },
  classRoom: {
    label: '班级'
  },
  students: {
    label: '学生',
    children: generateFieldList(defineTableFieldConfig({
      students_name: {
        label: '名称'
      },
      students_no: {
        label: '学号'
      }
    }))
  },
  averageScore: {
    label: '平均分'
  }
})
