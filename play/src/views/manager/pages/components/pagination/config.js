import { usePagination } from './use-pagination'
export const basicConfig = usePagination({
  limit: 10,
  currentPage: 2,
  total: 120,
  title: '基础的分页组件'
})
export const backgroundConfig = usePagination({
  currentPage: 2,
  limit: 10,
  background: false,
  total: 120,
  title: '去掉分页背景颜色的组件'
})
export const switchConfig = usePagination({
  currentPage: 2,
  limit: 10,
  hideOnSinglePage: true,
  total: 2,
  title: '只有一页时不展示分页'
})
export const compactConfig = usePagination({
  currentPage: 2,
  limit: 10,
  total: 120,
  title: '紧凑模式'
})
export const eventConfig = usePagination({
  currentPage: 2,
  limit: 10,
  total: 120,
  title: '触发事件的分页组件'
})
