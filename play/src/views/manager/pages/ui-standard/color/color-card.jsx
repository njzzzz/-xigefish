import { onMounted, ref } from 'vue'
export default {
  props: {
    cssVar: String
  },
  setup (props) {
    const color = ref('')
    onMounted(() => {
      const styles = getComputedStyle(document.documentElement)
      color.value = styles.getPropertyValue(props.cssVar)
      // mainColor.value = document.body.style.getPropertyValue(`--el-color-${props.type}`)
    })
    return () => <div style={{
      backgroundColor: `var(${props.cssVar})`,
      color: 'var(--el-color-white)',
      borderRadius: 'var(--el-border-radius-base)',
      padding: '20px'
    }}>
      {props.cssVar}<br/>
      {color.value.toLocaleUpperCase()}
    </div>
  }
}
