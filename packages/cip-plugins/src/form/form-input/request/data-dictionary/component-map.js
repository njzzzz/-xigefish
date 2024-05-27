export default (mode) => () => {
  switch (mode) {
    case '':
      return import('./index')
    case '/view':
      return import('./view')
    case '/configure':
      return import('./configure')
  }
  return import('./index')
}
