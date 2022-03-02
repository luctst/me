<template>
  <section
  :style="innerStyle"
  class="modal">
    <header class="modal--header">
      <div class="modal--header--title">{{ data.name }}</div>
      <div class="modal--header--icon">
        <modalicon @click="$emit('removeModal')"></modalicon>
      </div>
    </header>
    <main class="modal--main">
      <img
      v-if="data.extension === '.jpg'"
      :height="data.height"
      :width="data.width"
      :src="`${$store.state.hostName}${data.url}`"/>
    </main>
  </section>
</template>

<script>
import modalicon from '~/assets/modalicon.svg?inline';

export default {
  name: 'Modal',
  components: {
    modalicon,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    innerStyle() {
      return `z-index:${this.data.zIndex};top:${this.data.top};left:${this.data.left};`;
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  height: max-content;
  flex-direction: column;
  position: absolute;

  &:hover {
    cursor: grab;
  }

  &--header {
    align-items: center;
    border-bottom: 1px solid $mainBlack;
    background-color: $secondaryLight;
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 0 10px;

    &--title {
      color: $mainBlack;
      font-family: 'helvetica-thin', sans-serif;
      font-weight: 400;
      line-height: 16.7px;
    }

    &--icon {
      svg {
        &:hover {
          cursor: pointer;
        }

        height: 10px;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        width: 10px;
      }
    }
  }

  &--main {
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  }
}
</style>