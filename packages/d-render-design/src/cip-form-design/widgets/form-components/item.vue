<template>
  <li class="form-component-item" :class="item.class">
    <a>
      <i class="form-component-item__icon" :class="item.icon" />
      {{item.label}}
    </a>
  </li>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormComponentItem',
  props: {
    item: Object
  }
})
</script>
