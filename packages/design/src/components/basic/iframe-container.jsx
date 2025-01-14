import { onMounted, ref, createApp, provide } from 'vue'
import { useCipConfig } from '@xigefish/d-render-shared'

export default {
  props: {},
  setup (props, { slots }) {
    const doc = ref(defaultDoc)
    const cipConfig = useCipConfig()
    const iframe$ = ref()
    onMounted(() => {
      iframe$.value.onload = () => {
        Array.from(document.head.childNodes).filter(v => ['STYLE', 'LINK'].includes(v.nodeName))
          .forEach(style => {
            iframe$.value.contentDocument.head.appendChild(style.cloneNode(true))
          })
        // styles.use()
        createApp({
          setup () {
            provide('cip-config', cipConfig)
            return () => slots.default?.()
          }
        }).mount(iframe$.value.contentDocument.getElementById('app'))
      }
    })
    const style = {
      margin: 'auto 0',
      pointerEvents: 'auto',
      width: '100%',
      height: '100%',
      border: 'none'
    }
    return () => <iframe ref={iframe$} srcdoc={doc.value} style={style}></iframe>
  }
}

const defaultDoc = `<html>
    <style type="text/css">
        html,body {height: 100%; margin: 0; padding: 0}
        #app{height: 100%}
    </style>
    <body>
        <div id="app"></div>
    </body>
</html>
`
