import { ref } from 'vue'
export const disabledOptions = ref([
  {
    id: '_text',
    label: '文本',
    value: 'text',
    children: [
      {
        label: '文本子节点',
        value: '文本子节点'
      }, {
        label: '文本子节点2',
        value: '文本子节点2'
      }
    ]
  }, {
    id: '_image',
    label: '图像',
    value: 'image',
    children: [
      {
        label: '图像子节点',
        value: '图像子节点',
        disabled: true
      }, {
        label: '图像子节点2',
        value: '图像子节点2'
      }
    ]
  }, {
    id: '_video',
    label: '视频',
    value: 'video',
    disabled: true,
    children: [
      {
        label: '视频子节点',
        value: '视频子节点'
      }, {
        label: '视频子节点2',
        value: '视频子节点2'
      }
    ]
  }
])
