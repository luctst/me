<template>
  <section class="container loader"></section>
</template>

<script>
export default {
  name: 'loader',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      this.loading = true;
    }
  },
}
</script>

<style lang="scss" scoped>
.loader {
  background: #E5E5E5;
  height: 100vh;
  padding: 0 15px;
}
</style>
