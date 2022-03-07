<template>
  <section
  :style="innerStyle"
  class="modal"
  @mousedown.prevent="dragMouseDown"
  ref="modal">
    <header class="modal--header">
      <div class="modal--header--title">{{ data.name }}</div>
      <div class="modal--header--icon" @click="$emit('removeModal')">
        <modalicon></modalicon>
      </div>
    </header>
    <main class="modal--main">
      <img
      v-if="data.extension === '.jpg'"
      :height="data.height"
      :width="data.width"
      :src="`${$store.state.hostName}${data.url}`"
      class="modal--main--img"/>
      <div v-else class="modal--main--content">{{ data.content }}</div>
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
      return `z-index:${this.data.zIndex};top:${this.data.top}px;left:${this.data.left}px;`;
    }
  },
  methods: {
    dragMouseDown(e) {
      let newPosLeft = 0;
      let newPosTop = 0;
      let cursorLeft = e.clientX;
      let cursorTop = e.clientY;
      const vm = this;

      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);

      function closeDragElement(evt) {
        evt.preventDefault();
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
      }

      function elementDrag(evt) {
        evt.preventDefault();
        vm.$parent.$refs.i.forEach((m, i) => {
          if (m.$props.data.name === vm.$props.data.name) {
            m.$el.style.zIndex = 100 + vm.$parent.$refs.i.length;
            return true;
          }

          m.$el.style.zIndex = 100 + i;
          return true;
        });

        newPosLeft = cursorLeft - evt.clientX;
        newPosTop = cursorTop - evt.clientY;

        cursorLeft = evt.clientX;
        cursorTop = evt.clientY;

        vm.$refs.modal.style.left = `${vm.$refs.modal.offsetLeft - newPosLeft}px`;
        vm.$refs.modal.style.top = `${vm.$refs.modal.offsetTop - newPosTop}px`;
      } 
    },
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
    box-sizing: border-box;
    background-color: $secondaryLight;
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 0 10px;
    width: 100%;

    &--title {
      color: $mainBlack;
      font-family: 'helvetica-regular', sans-serif;
      font-weight: 400;
      line-height: 14px;

      @media screen and (min-width: 700px) {
        font-size: 13px;
      }
    }

    &--icon {
      &:hover {
        cursor: pointer;
      }

      height: 100%;
      width: 5%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      svg {
        height: 10px;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        width: 10px;
      }
    }
  }

  &--main {
    background-color: $secondaryLight;
    
    &--img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }

    &--content {
      align-items: flex-end;
      color: $mainBlack;
      display: flex;
      font-family: 'helvetica-medium', sans-serif;
      font-weight: 500;
      height: max-content;
      min-height: 324px;
      width: 440px;
      max-width: 500px;
      line-height: 28.63px;
      margin-top: 6px;
      margin-bottom: 8px;
      padding: 0 10px;

      @media screen and (min-width: 700px) {
        font-size: 16px;
      }
    }
  }
}
</style>