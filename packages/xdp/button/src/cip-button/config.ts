import {
  Upload,
  // Search,
  // RefreshLeft,
  Delete,
  Download
} from '@element-plus/icons-vue'
import Plus from './icon/Plus'
export const defaultButtonConfigMap = {
  search: {
    type: 'primary',
    // icon: Search,
    text: '查询'
  },
  reset: {
    type: 'default',
    // icon: RefreshLeft,
    text: '重置'
  },
  create: {
    type: 'primary',
    icon: Plus,
    text: '新增'
  },
  batchDelete: {
    type: 'default',
    icon: Delete,
    text: '删除'
  },
  export: {
    type: 'warning',
    icon: Download,
    plain: true,
    text: '导出'
  },
  upload: {
    type: 'default',
    icon: Upload,
    text: '上传'
  }
}
