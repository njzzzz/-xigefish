import styles from './ui-standard-page.module.less'
import TextareaDirective from '@xigefish/components/directives/textarea'
export default {
  props: {
    title: String,
    intro: String,
    rules: { type: Array, default: () => [] }
  },
  directives: {
    [TextareaDirective.name]: TextareaDirective
  },
  setup (props, { slots }) {
    return () => <div class={styles['intro-container']}>
      {props.title && <h2 class={styles.intro__title}>{props.title}</h2>}
      {props.intro && <div class={styles.intro__intro} v-textarea={props.intro}/>}
      {
        props.rules.length > 0 && <ul class={styles.intro__rules} >
          {props.rules.map(rule => <li class={styles.intro__rule} key={rule}>{rule}</li>)}
        </ul>
      }
      {
        slots.default &&
        <div class={styles.intro__content}>
          {slots.default?.()}
        </div>
      }
    </div>
  }
}
