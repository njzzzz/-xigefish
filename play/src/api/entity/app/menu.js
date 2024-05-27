export const menuEntity = {
  id: {}, // 唯一标识可为空
  name: {}, // 对于路由名称
  title: {}, // 标题
  code: {}, // 权限
  icon: {},
  cache: {}, // 是否开启缓存 也可有route定义是用meta.cache直接控制
  children: { type: ['this'] },
  router: {},
  route: {},
  hideInMenu: {},
  badge: {}, // number
  getBadge: {},
  hideAsideWhenTop: {},
  isOpen: {},
  type: {} // 如果存在children则咨询渲染类型
}
