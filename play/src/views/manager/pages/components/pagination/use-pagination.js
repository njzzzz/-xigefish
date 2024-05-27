import { reactive } from 'vue'
export const usePagination = ({ currentPage, limit, background, hideOnSinglePage, title, total }) => {
  const paginationConfig = reactive({
    currentPage: currentPage,
    limit: limit,
    background: background,
    hideOnSinglePage: hideOnSinglePage,
    title: title,
    total: total
  })
  return paginationConfig
}
