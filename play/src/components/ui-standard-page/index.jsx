import { computed } from 'vue'
import Block from './block'
import styles from './ui-standard-page.module.less'
const UIStandardPage = {
  props: {
    title: [Array, String]
  },
  setup (props, { slots }) {
    const titleArr = computed(() => {
      return [].concat(props.title).join(' · ')
    })
    return () => <div class={styles.container}>
      <div class={styles.header}>
        <h1>{titleArr.value}</h1>
      </div>
      <div class={styles.content}>
        {slots.default?.()}
      </div>
    </div>
  }
}

UIStandardPage.Block = Block

export default UIStandardPage
