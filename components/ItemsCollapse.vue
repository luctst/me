<template>
  <div class="project--item--meta">
    <div class="project--item--meta--container"></div>
  </div>
</template>

<script>
export default {
  name: 'itemCollapse',
  props: {
    assets: {
      type: [Array, Boolean],
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.project--item--meta {
  box-sizing: border-box;
  height: 20px;
  flex: 0 0 100%;

  &--container {
    background-color: red;
    height: inherit;
    padding-left: 32px;
  }
}
</style>