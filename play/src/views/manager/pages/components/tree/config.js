export const accordionConfig = {
  accordion: true
}
export const checkboxConfig = {
  showCheckbox: true
}

export const lazyloadConfig = {
  optionProps: { isLeaf: 'leaf' },
  lazyLoad: (node, resolve) => {
    if (node.level === 0) {
      return resolve([{ label: 'region' }])
    }
    if (node.level > 1) return resolve([])

    setTimeout(() => {
      const data = [
        {
          label: 'leaf',
          leaf: true
        },
        {
          label: 'zone'
        }
      ]
      resolve(data)
    }, 500)
  }
}

export const disabledConfig = {
  showCheckbox: true,
  disabled: 'disabled'
}

export const checkedConfig = {
  currentNodeKey: 3,
  highlightCurrent: true
}

export const customConfig = {
  buttonList: [
    'append',
    'edit',
    'remove'
  ]
}
