function textareaDir (el, binding) {
  if (binding.value) {
    el.innerHTML = `
          <pre style="margin:0;word-wrap: break-word;white-space:pre-wrap;font-family: inherit">${binding.value}</pre>
        `
  } else {
    el.innerHTML = ''
  }
}

export default {
  name: 'textarea',
  created: textareaDir,
  // mounted: textareaDir
  beforeUpdate: textareaDir
}
