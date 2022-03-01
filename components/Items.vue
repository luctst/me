<template>
  <div class="project--item">
    <div class="project--item--left">
      <div class="project--item--left--icon">
        <folderall v-if="itemsType === 'repos'"></folderall>
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
    <div class="project--item--right"></div>
    <div 
    v-if="showMeta" 
    class="project--item--meta">
    </div>
  </div>
</template>

<script>
import folderall from '~/assets/folderall.svg?inline';

export default {
  name: 'Items',
  components: {
    folderall
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
}
</script>

<style lang="scss" scoped>
.project--item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 56px;
  max-width: inherit;
  width: inherit;

  &--left {
    align-items: center;
    display: flex;

    &--icon {
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
      font-family: 'helvetica-thin', sans-serif;
      font-size: 14px;
      font-weight: 300;
      margin: 0 13px;
    }

    &--topics {
      display: flex;

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
}
</style>