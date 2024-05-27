export const withoutConfigure = (mode) => () => {
  switch (mode) {
    case '':
      return import('./index')
    case '/view':
      return import('./view')
  }
  return import('./index')
}
