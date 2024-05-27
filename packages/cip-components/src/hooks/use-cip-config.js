import { useConfig } from '@xigefish/config'
import { usePageConfig } from '@xigefish/page-layout-shared'
// !!IMPORTANT: cip-config-provide的注入功能，需要保持key为字符串不然就需要依赖cip组件
export const useCipConfig = useConfig

export const useCipPageConfig = usePageConfig
