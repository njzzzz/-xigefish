import { ref } from 'vue'
export const useBasicOptions = () => {
  const basicOptions = ref([
    {
      id: '1',
      label: '文本',
      value: 'text',
      children: [
        {
          id: 2,
          label: '文本子节点',
          value: '文本子节点'
        }, {
          id: 3,
          label: '文本子节点2',
          value: '文本子节点2'
        }
      ]
    }, {
      id: 4,
      label: '图像',
      value: 'image',
      children: [
        {
          id: 5,
          label: '图像子节点',
          value: '图像子节点'
        }, {
          id: 6,
          label: '图像子节点2',
          value: '图像子节点2'
        }
      ]
    }, {
      id: 7,
      label: '视频',
      value: 'video',
      children: [
        {
          id: 8,
          label: '视频子节点',
          value: '视频子节点'
        }, {
          id: 9,
          label: '视频子节点2',
          value: '视频子节点2'
        }
      ]
    }
  ])
  return basicOptions
}
