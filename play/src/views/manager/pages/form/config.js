import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
import { accountManagerService, fileService } from '@/api'
import { tableColumns, searchFieldList, tableRadioColumns } from '../curd/config'
import usePromise from './usePromise'

const options = [{ value: 1, label: '是' }, { value: 0, label: '否' }]
export const formFieldList = generateFieldList(defineFormFieldConfig({
  _classifyLayout: {
    type: 'classifyLayout',
    options: [
      {
        children: generateFieldList(defineFormFieldConfig({
          _title0: { type: 'staticInfo', staticInfo: '通用功能测试', directory: true },
          input: { label: '隐藏label必填测试', required: true, hideLabel: true, type: 'input', placeholder: '隐藏label必填测试', clearable: false },
          input1: { label: 'labelPosition测试', labelPosition: 'top', required: true, placeholder: 'top', type: 'input', clearable: false },
          input2: { label: 'labelPosition测试', labelWidth: '200px', labelPosition: 'right', placeholder: 'right', required: true, type: 'input', clearable: false },
          input3: { label: 'labelPosition测试', labelWidth: '200', labelPosition: 'left', placeholder: 'left', required: true, type: 'input', clearable: false },
          input4: {
            label: 'labelWidth测试',
            labelWidth: 120,
            required: true,
            type: 'input',
            clearable: false
          },
          input41: {
            label: '请求参数（headers）',
            labelWidth: '120',
            labelPosition: 'right',
            required: true,
            type: 'table',
            options: tableColumns
          },
          input42: {
            label: '请求参数（headers）',
            labelWidth: '120',
            labelPosition: 'top',
            required: true,
            type: 'table',
            options: tableColumns
          },
          input5: {
            label: 'labelStyle测试',
            labelStyle: {
              color: 'rgba(0,0,0,0)',
              backgroundImage: 'linear-gradient(to right ,var(--el-color-primary), var(--el-color-danger))',
              webkitBackgroundClip: 'text'
            },
            required: true,
            type: 'input',
            clearable: false
          }
        }))
      },
      {
        children: generateFieldList(defineFormFieldConfig({
          _title1: { type: 'staticInfo', staticInfo: '日期类组件', directory: true },
          text: { type: 'text', defaultValue: '<span style="color: red; font-size: 18px">你好</span> 你好啊' },
          date: { label: '日期', type: 'date' },
          dateRange1: { label: '日期范围', type: 'dateRange', clearable: false, otherKey: 'dateRange1-1', options },
          dateRange2: { label: '日期范围（时间戳）', type: 'dateRange', otherKey: 'dateRange2-1', options, isTimestamp: true },
          timeRange1: { label: '时间区间', type: 'timeRange', otherKey: 'timeRange1-1', startPlaceholder: '开始时间', endPlaceholder: '结束时间' },
          timeRange2: { label: '时间区间(缺省otherKey测试)', type: 'timeRange', endPlaceholder: '缺省otherKey' },
          timeSelect: { label: '时间选择', type: 'time', start: '10: 00', end: '18: 00', step: '00: 60' },
          numberRange: { label: '计数区间', type: 'numberRange', min: -1 }
        }))
      },
      {
        children: generateFieldList(defineFormFieldConfig({
          _title2: { type: 'staticInfo', staticInfo: '选择类组件', directory: true },
          select1: { label: '下拉选择1', type: 'select', options },
          select2: { label: '下拉选择2', type: 'select', options: [1, 2, 3, 4] },
          select3: { label: '下拉选择3', type: 'select', multiple: true, options, otherKey: 'select3-3' },
          radio1: { label: '单选', type: 'radio', options, otherKey: 'radio1-1' },
          checkbox1: { label: '复选', type: 'checkbox', options, otherKey: 'checkbox1-1' },
          selectImage1: {
            label: '选择图片',
            type: 'selectImage',
            options: [{
              value: 1,
              label: 'https://img2.woyaogexing.com/2022/06/21/fdb0a16e8f9e9850!400x400.jpg'
            }, {
              value: 2,
              label: 'https://img2.woyaogexing.com/2022/06/21/a18dbd4ccf2b2feb!400x400.jpg'
            }]
          },
          selectImage2: {
            label: '选择图片复选',
            type: 'selectImage',
            multiple: true,
            options: [{
              value: 1,
              label: 'https://img2.woyaogexing.com/2022/06/21/fdb0a16e8f9e9850!400x400.jpg'
            }, {
              value: 2,
              label: 'https://img2.woyaogexing.com/2022/06/21/a18dbd4ccf2b2feb!400x400.jpg'
            }]
          },
          tree: {
            label: '树',
            type: 'tree',
            optionProps: { children: 'children', label: 'label' },
            options: [
              {
                label: 'Level one 1',
                children: [
                  {
                    label: 'Level two 1-1',
                    children: [
                      {
                        label: 'Level three 1-1-1'
                      }
                    ]
                  }
                ]
              },
              {
                label: 'Level one 2',
                children: [
                  {
                    label: 'Level two 2-1',
                    children: [
                      {
                        label: 'Level three 2-1-1'
                      }
                    ]
                  },
                  {
                    label: 'Level two 2-2',
                    children: [
                      {
                        label: 'Level three 2-2-1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          selectTree: {
            label: '下拉选择树',
            type: 'selectTree',
            options: [
              {
                value: '1',
                label: '1',
                children: [
                  { value: '1-1', label: '1-1' },
                  { value: '1-2', label: '1-2' }
                ]
              }
            ]
          },
          cascader: {
            label: '级联选择器',
            type: 'cascader',
            optionProps: {
              label: 'name',
              value: 'areaCode',
              emitPath: false,
              lazy: true,
              lazyLoad: async (node, resolve) => {
                const { level } = node
                if (level === 0) {
                  const res = await usePromise([
                    { name: '广东省', areaCode: '1' }
                  ])
                  resolve(res)
                } else if (level === 1) {
                  const res = await usePromise([
                    { name: '汕头市', areaCode: '1-1' }
                  ])
                  resolve(res)
                } else if (level === 2) {
                  const res = await usePromise([
                    { name: '南奥县', areaCode: '1-1-1', leaf: true },
                    { name: '澄海区', areaCode: '1-1-2', leaf: true }
                  ])
                  resolve(res)
                }
              }
            }
          },
          selectObject: {
            label: '下拉选择值为对象',
            type: 'selectObject',
            multiple: true,
            optionProps: { label: 'label', value: 'value' },
            options: [
              {
                label: '测试',
                value: 1
              }, {
                label: '测试2',
                value: 2
              }
            ]
          },
          singleCheckbox: {
            label: '单个复选框',
            type: 'singleCheckbox',
            option: {
              label: '是',
              value: 1,
              inactiveValue: 2
            }
          },
          slider: { label: '滑块', type: 'slider' },
          switch: { label: '开关', type: 'switch', activeText: '开启', inactiveText: '关闭', activeValue: 1, inactiveValue: 0 },
          rate: { label: '评分', type: 'rate', allowHalf: true, defaultValue: 5 },
          selectInputTable1: {
            label: '可选列表(单选)',
            type: 'selectInputTable',
            otherKey: ['selectInputTable1-1', 'selectInputTable1-2'],
            entity: accountManagerService,
            tableColumns,
            searchFieldList,
            optionProps: { value: 'id', label: 'userName' }
          },
          selectInputTable2: {
            label: '可选列表(多选)',
            type: 'selectInputTable',
            tableHideIndex: true,
            defaultSearchFilter: { username: 'abc' },
            multiple: true,
            otherKey: ['selectInputTable2-1', 'selectInputTable2-2'],
            entity: accountManagerService,
            tableColumns,
            searchFieldList,
            optionProps: { value: 'id', label: 'userName' }
          },
          selectTable1: {
            label: '可选列表',
            hideLabel: true,
            type: 'selectTable',
            entity: accountManagerService,
            tableColumns,
            searchFieldList,
            optionProps: { value: 'id', label: 'userName' }
          },
          selectTable2: {
            label: '可选列表',
            hideLabel: true,
            multiple: false,
            type: 'selectTable',
            entity: accountManagerService,
            tableColumns,
            searchFieldList,
            optionProps: { value: 'id', label: 'userName' }
          },
          table: {
            label: '表格',
            type: 'table',
            options: tableColumns
          },
          tableRadio: {
            label: 'tableRadio',
            type: 'table',
            options: tableRadioColumns
          }
        }))
      },
      {
        children: generateFieldList(defineFormFieldConfig({
          _title3: { type: 'staticInfo', staticInfo: '文件类组件', directory: true },
          image: { label: '图片', type: 'image', uploadFn: fileService.uploadImage, itemWidth: '80px' },
          video: { label: '视频', type: 'image', uploadFn: fileService.uploadVideo, mediaType: 'video' }
        }))
      },
      {
        children: generateFieldList(defineFormFieldConfig({
          textarea1: {
            label: '多行文本',
            type: 'textarea',
            placeholder: '测试autosize',
            autosize: { minRows: 5, maxRows: 6 },
            dependOn: ['select2'],
            changeConfig: (config, { select2 }, outValues) => {
              if (select2) {
                config.autosize.minRows = select2
              }
              console.log(config)
              return config
            }
          },
          editor: { label: '富文本', type: 'editor', otherKey: 'textarea1' },
          link1: { label: '链接', type: 'link', otherKey: 'link2' },
          autocomplete: {
            label: '自动补全输入框',
            type: 'autocomplete',
            asyncOptions: async (query) => {
              console.log('query', query)
              const res = await usePromise([
                { value: query + 'X', link: 'https://github.com/vuejs/vue' },
                { value: query + 'XX', link: 'https://github.com/ElemeFE/element' },
                { value: query + 'XXX', link: 'https://github.com/ElemeFE/cooking' }
              ])
              return res
            }
          },
          input: { label: '输入框', type: 'input', limit: 10, clearable: true },
          numberInput: { label: '数字输入框', type: 'number', step: 10, max: 100, min: 0 },
          passwordInput: { label: '密码输入框', type: 'password', placeholder: '请输入密码' },
          host: {
            label: 'url地址编辑', type: 'urlEditor', otherKey: ['protocol', 'port', 'path']
          },
          divider: { label: '分割线', type: 'divider', defaultValue: '标题' },
          mobileUpload: { label: '上传', type: 'image' },
          staticInfo: { label: '静态文本', defaultValue: '111' }
        }))
      }
    ]
  }

}))
