<template>
  <div class="component-group" v-if="group.components.length>0">
    <div class="component-group__label">
      {{group.label}}
    </div>
    <vue-draggable :model-value="group.components"
                   item-key="type"
                   tag="ul"
                   :group="{name: 'components', pull: 'clone', put:false}"
                   :sort="false"
                   :clone="cloneComponent">
      <template #item="{element}">
        <form-component-item :item="element"></form-component-item>
      </template>
    </vue-draggable>
  </div>
</template>
<script>
import { inject } from 'vue'
import VueDraggable from 'vuedraggable'
import FormComponentItem from '../form-components/item'
import { getCopyRow } from '../util'

export default {
  components: { VueDraggable, FormComponentItem },
  props: {
    group: Object
  },
  setup (props) {
    const cloneMethod = inject('cloneMethod', getCopyRow)
    const cloneComponent = (component) => {
      return cloneMethod({ config: component })
    }
    return {
      cloneComponent
    }
  }
}
</script>
