import { computed, defineAsyncComponent } from 'vue'
export default {
  props: {
    type: { type: String, default: 'image', validate: (val) => ['video', 'image'].includes(val) },
    src: String
  },
  setup (props) {
    const Component = computed(() => {
      return props.type === 'video'
        ? defineAsyncComponent(() => import('@xigefish/components/cip-dynamic-video'))
        : defineAsyncComponent(() => import('@xigefish/components/cip-dynamic-image'))
    })
    return () => <Component.value src={props.src}></Component.value>
  }
}
