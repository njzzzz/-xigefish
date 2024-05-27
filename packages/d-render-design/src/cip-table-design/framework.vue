<template>
  <div class="cip-td-dynamic-form-design">
    <div class="cip-td-dynamic-form-design__components">
      <slot name="components"></slot>
    </div>
    <div class="cip-td-dynamic-form-design__form">
      <div class="cip-td-dynamic-form-design__toolbar">
        <slot name="toolbar"></slot>
      </div>
      <slot></slot>
    </div>
    <div class="cip-td-dynamic-form-design__property">
      <slot name="property"></slot>
    </div>
  </div>
</template>
