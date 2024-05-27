export const mockMenu = [{
  name: '_uiStandard',
  title: '一级菜单',
  router: 'breadcrumb',
  children: [
    {
      name: '_nav',
      title: '二级菜单',
      children: [
        {
          name: 'componentBreadcrumb',
          title: '当前页'
        }
      ]
    }
  ]
}]
