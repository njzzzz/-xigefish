<template>
    <router-view>
      <template #default="{Component}">
        <keep-alive :include="cachePage">
          <component :is="Component"></component>
        </keep-alive>
      </template>
    </router-view>
</template>
<script>
export default {
  name: 'CipAlivePages',
  inheritAttrs: false,
  props: { cachePage: Array }
}
</script>
