class DomThemeClass {
  getDom () {
    return document.querySelector('html')
  }

  light () {
    const dom = this.getDom()
    if (dom.classList.contains('dark')) {
      dom.classList.remove('dark')
    }
  }

  dark () {
    const dom = this.getDom()
    // dom.classList.
    if (!dom.classList.contains('dark')) {
      dom.classList.add('dark')
    }
  }
}
const domThemeClass = new DomThemeClass()
export class SystemTheme {
  getDom () {
    return document.querySelector('html')
  }

  change (theme) {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme
      this[`${theme}Theme`]?.()
    }
  }

  lightTheme () {
    this.stopAuto()
    domThemeClass.light()
  }

  darkTheme () {
    this.stopAuto()
    domThemeClass.dark()
  }

  stopAuto () {
    if (this.media) {
      this.media.removeListener(this.autoHandler)
    }
  }

  autoHandler (e) {
    const theme = e.matches ? 'dark' : 'light'
    domThemeClass[theme]?.()
    // this.change(theme)
    // this.change()
  }

  autoTheme () {
    this.media = window.matchMedia('(prefers-color-scheme: dark)')
    this.media.addListener(this.autoHandler)
    this.autoHandler(this.media)
  }
}
