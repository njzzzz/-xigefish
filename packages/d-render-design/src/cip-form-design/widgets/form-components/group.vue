<template>
  <div class="component-group" v-if="group.components.length>0">
    <div class="component-group__label">
      {{group.label}}
    </div>
<!--    <ul class="component-group__list">-->
    <vue-draggable :model-value="group.components"
                   item-key="type"
                   tag="ul"
                   :group="{name: 'components', pull: 'clone', put:false}"
                   :sort="false"
                   :clone="cloneComponent">
      <template #item="{element}">
        <form-component-item :item="element" @click="addComponent(element)"></form-component-item>
      </template>
    </vue-draggable>
<!--    </ul>-->
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import VueDraggable from 'vuedraggable'
import FormComponentItem from './item'
import { getCopyRow } from '../../util'

export default defineComponent({
  components: { VueDraggable, FormComponentItem },
  props: {
    group: Object
  },
  emits: ['add'],
  setup (props, { emit }) {
    const cloneComponent = (component) => {
      const { icon, ...config } = component
      // // 排除自身的icon
      return getCopyRow({ config })
      // const type = component.type
      // const sign = generateFieldKey(type)
      // const element = {
      //   id: sign, // 选中标示
      //   key: sign,
      //   config: { ...component }
      // }
      // if (twoValueComponentList.includes(type)) {
      //   element.config.otherKey = `other_${sign}`
      // }
      // return element
    }
    const addComponent = (component) => {
      emit('add', cloneComponent(component))
    }
    return {
      cloneComponent,
      addComponent
    }
  }
})
</script>
