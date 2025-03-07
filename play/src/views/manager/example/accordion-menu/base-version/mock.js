import { Plus } from '@element-plus/icons-vue'

export const mockMenu = [{
  name: '1',
  title: '一级菜单',
  icon: '_code',
  children: [{
    name: '1-1',
    title: '二级菜单',
    children: [
      {
        name: '1-1-1',
        title: '三级菜单'
      }
    ]
  }, {
    name: '1-2',
    title: '二级菜单',
    badge: 8
  }]
}, {
  name: '2',
  title: '一级菜单',
  icon: Plus
}, {
  name: '3',
  title: '一级菜单',
  icon: 'el-icon-bell'
}]
