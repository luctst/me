<template>
  <div 
  @click="showMeta = !showMeta"
  :class="['project--item', type !== 'public' ? 'is__private' : 'is__public']"
  v-add-class-hover>
    <div class="project--item--left">
      <div class="project--item--left--icon">
        <folderall v-if="itemsType === 'repos'"></folderall>
        <folderapp v-if="itemsType === 'app'"></folderapp>
        <foldernpm v-if="itemsType === 'npm'"></foldernpm>
      </div>
      <div class="project--item--left--name">{{ repoName }}</div>
      <div class="project--item--left--topics">
        <span v-if="language">{{ language }}</span>
        <template
        v-if="topics.length">
          <span
          v-for="(topic, y) in topics"
          :key="y">
            {{ topic }}
          </span>
        </template>
      </div>
    </div>
    <div v-if="type !== 'public'" class="project--item--middle">{{ parseMiddleContent }}</div>
    <div class="project--item--right">
      <div class="project--item--right--id">{{ repoId }}</div>
      <div class="project--item--right--pushed">{{ parseDate }}</div>
    </div>
    <div 
    v-if="showMeta" 
    class="project--item--meta">
    </div>
  </div>
</template>

<script>
import folderall from '~/assets/folderall.svg?inline';
import folderapp from '~/assets/folderapp.svg?inline';
import foldernpm from '~/assets/foldernpm.svg?inline';

export default {
  name: 'Items',
  components: {
    folderall,
    folderapp,
    foldernpm,
  },
  props: {
    itemsType: {
      type: String,
      required: true,
    },
    repoName: {
      type: String,
      required: true,
    },
    repoId: {
      type: Number,
      required: true,
    },
    language: {
      type: [String, Boolean],
      required: true,
    },
    topics: {
      type: Array,
      required: true,
    },
    lastPush: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      showMeta: false,
    };
  },
  computed: {
    parseDate() {
      const d = new Date(this.lastPush);
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    },
    parseMiddleContent() {
      if (this.type === 'private') return 'Private';
      return '';
    }
  },
  directives: {
    "add-class-hover": {
      bind(el) {
        el.addEventListener("mouseenter", () => {
          el.classList.add('project__hover');
        });
        el.addEventListener("mouseleave", () => {
          el.classList.remove('project__hover');
        });
      },
      unbind(el) {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.is__private {
  opacity: .5;

  &:hover {
    cursor: not-allowed;
  }
}

.is__public {
  &:hover {
    cursor: pointer;
  }
}

.project__hover {
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: $secondaryLight;
}

.project--item {
  align-items: center;
  border-bottom: 1px solid $secondaryGrey;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 56px;
  max-width: inherit;
  transition: all 900ms cubic-bezier(0.19, 1, 0.22, 1);
  transform: translate(0, 0) scale(1);
  width: inherit;

  &--left {
    align-items: center;
    display: flex;
    transition: all 900ms cubic-bezier(0.19, 1, 0.22, 1);

    &--icon {
      flex: 0 0 auto;
      height: 16px;
      width: 20px;

      svg {
        width: auto;
        height: auto;
        object-fit: contain;
      }
    }

    &--name {
      align-items: center;
      display: flex;
      color: $mainBlack;
      flex: 0 0 auto;
      font-family: 'helvetica-thin', sans-serif;
      font-size: 14px;
      font-weight: 300;
      margin: 0 13px;
    }

    &--topics {
      flex: 0 0 auto;
      height: 100%;
      display: flex;
      overflow-y: hidden;
      scrollbar-width: none;
      white-space: nowrap;

      &::-webkit-scrollbar {
        display: none;
      }

      @media screen and (min-width: 700px) {
        max-width: 150px;
      }

      @media screen and (min-width: 1100px) {
        max-width: 400px;
      }

      span {
        background-color: $mainYellow;
        border-radius: 2px;
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-size: 10px;
        line-height: 12px;
        font-weight: 500;
        height: fit-content;
        margin-right: 8px;
        padding: 4px 5px;
      }
    }
  }

  &--middle {
    color: $mainBlack;
    font-family: 'helvetica-thin', sans-serif;
    font-size: 14px;
    font-weight: 300;
    margin-left: auto;
    margin-right: 14px;
  }

  &--right {
    display: flex;
    justify-content: space-between;
    transition: all 900ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 100%;

    @media screen and (min-width: 700px) {
      max-width: 150px;
    }

    &--id,
    &--pushed {
      color: $mainBlack;
      font-family: 'helvetica-thin', sans-serif;
      font-size: 14px;
      font-weight: 300;
    }
  }

  &--meta {
    flex: 0 0 100%;
  }
}
</style>