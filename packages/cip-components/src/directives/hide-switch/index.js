
export default {
  name: 'hide-switch',
  created (el, binding, vnode) {},
  mounted (el, binding, vnode) {
    // 为第一个子元素添加样式
    el.firstChild.style.overflow = 'hidden'
    const pos = (binding.value || 'right').toLowerCase()
    if (!['top', 'right', 'bottom', 'left'].includes(pos)) {
      console.error('指令hide-switch传入值不合法[\'top\', \'right\', \'bottom\', \'left\']')
      return
    }
    el.style.position = 'relative'
    const switchDom = document.createElement('span')
    switchDom.style[pos] = '0'
    switch (pos) {
      case 'top':
        switchDom.style.left = '50%'
        switchDom.style.transform = 'translate(-50%,calc(-100% + 24px)) rotate(270deg)'
        break
      case 'right':
        switchDom.style.top = '50%'
        switchDom.style.transform = 'translate(100%,-50%)'
        break
      case 'bottom':
        switchDom.style.left = '50%'
        switchDom.style.transform = 'translate(100%,-50%) rotateY(90deg)'
        break
      case 'left':
        switchDom.style.top = '50%'
        switchDom.style.transform = 'translate(-100%,-50%) rotateY(180deg)'
        break
    }
    switchDom.style.display = 'block'
    switchDom.style.height = '60px'
    switchDom.style.width = '12px'
    switchDom.style.position = 'absolute'
    switchDom.style.zIndex = '1999'
    switchDom.style.backgroundImage = `url(${require('./show.png')})`
    switchDom.style.backgroundSize = '100% 100%'
    switchDom.style.cursor = 'pointer'
    switchDom.onclick = () => {
      let judgeData = ''
      let updateFiled = ''
      let updateMinField = ''
      if (['top', 'bottom'].includes(pos)) {
        judgeData = el.offsetHeight
        updateFiled = 'height'
        updateMinField = 'minHeight'
      } else if (['left', 'right'].includes(pos)) {
        judgeData = el.offsetWidth
        updateFiled = 'width'
        updateMinField = 'minWidth'
      } else {
        return
      }
      if (judgeData) {
        el.style[updateFiled] = '0'
        el.style[updateMinField] = '0'
        el.style.border = 'none'
        el.style.padding = '0'
        switchDom.style.backgroundImage = `url(${require('./hide.png')})`
      } else {
        switchDom.style.backgroundImage = `url(${require('./show.png')})`
        el.style[updateFiled] = ''
        el.style[updateMinField] = ''
        el.style.padding = ''
        el.style.border = ''
      }
    }
    el.outerHtml = '123'
    el.appendChild(switchDom)
  }
}
