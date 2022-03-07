<template>
  <div
    @click="$emit('switchItemActive', !active)"
    :class="['project--item', type !== 'public' ? 'is__private' : 'is__public']"
    v-add-class-hover
  >
    <div class="project--item--left">
      <div class="project--item--left--icon">
        <folderall v-if="itemsType === 'repos'"></folderall>
        <folderapp v-if="itemsType === 'app'"></folderapp>
        <foldernpm v-if="itemsType === 'npm'"></foldernpm>
      </div>
      <div class="project--item--left--name">{{ repoName }}</div>
      <div class="project--item--left--topics">
        <span v-if="language" class="project--item--left--topics--tag">{{ language }}</span>
        <template v-else>
            <span v-if="topics.length" class="project--item--left--topics--tag">{{ topics[0] }}</span>
        </template>
        <span v-if="topics.length > 1" class="project--item--left--topics--count">
          +{{ topics.length - 1 }}
        </span>
      </div>
    </div>
    <div v-if="type !== 'public'" class="project--item--middle">
      <lock v-if="type === 'private'"></lock>
      <template v-else>
        {{ type }}
      </template>
    </div>
    <div class="project--item--right">
      <div class="project--item--right--id">{{ repoId }}</div>
      <div class="project--item--right--pushed">{{ parseDate }}</div>
    </div>
    <items-collapse 
    v-if="active" 
    :assets="forCollapseCompo" 
    :topics="collapseCompoTopics">
    </items-collapse>
  </div>
</template>

<script>
import folderall from '~/assets/folderall.svg?inline'
import folderapp from '~/assets/folderapp.svg?inline'
import foldernpm from '~/assets/foldernpm.svg?inline'
import lock from '~/assets/lock.svg?inline'

export default {
  name: 'Items',
  components: {
    folderall,
    folderapp,
    foldernpm,
    lock
  },
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    media: {
      type: [Array, Boolean],
      default: false,
      required: true,
    },
    itemsType: {
      type: String,
      required: true,
    },
    description: {
      type: [String, Boolean],
      default: false,
      required: true,
    },
    url: {
      type: [String, Boolean],
      default: false,
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
    },
  },
  computed: {
    collapseCompoTopics() {
      const topics = [...this.topics];
      if (!topics.length) return false;
      if (this.language) return topics;

      topics.splice(0, 1);
      return topics;
    },
    forCollapseCompo() {
      const assets = []

      if (this.media) {
        const assetMedia = this.media.map((a) => ({
          name: a.attributes.name,
          alt: a.attributes.alternativeText,
          extension: a.attributes.ext,
          height: a.attributes.height,
          width: a.attributes.width,
          path: a.attributes.url,
          small: {
            url: a.attributes.formats.thumbnail.url,
            height: a.attributes.formats.thumbnail.height,
            width: a.attributes.formats.thumbnail.width,
          },
          modal: {
            url: a.attributes.formats.small.url,
            height: a.attributes.formats.small.height,
            width: a.attributes.formats.small.width,
          },
        }))

        assets.push(...assetMedia)
      }

      if (this.description) {
        assets.push({
          extension: '.md',
          name: 'description.md',
          content: this.description,
        })
      }

      if (this.url) {
        assets.push({ extension: 'www', name: this.url })
      }

      return assets;
    },
    parseDate() {
      const d = new Date(this.lastPush)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    },
  },
  directives: {
    'add-class-hover': {
      bind(el, b, node) {
        el.addEventListener('click', () => {
          el.classList.remove('project__hover')
        })
        el.addEventListener('mouseenter', () => {
          if (
            node.context.active ||
            el.classList.contains('is__private')
          ) return false;

          el.classList.add('project__hover')
        })
        el.addEventListener('mouseleave', () => {
          el.classList.remove('project__hover')
        })
      },
      unbind(el) {
        el.removeEventListener('click', () => {})
        el.removeEventListener('mouseenter', () => {})
        el.removeEventListener('mouseleave', () => {})
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.is__private {
  opacity: 0.5;
  &:hover {
    cursor: default;
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
  max-height: fit-content;
  max-width: inherit;
  transition: all 900ms cubic-bezier(0.19, 1, 0.22, 1);
  transform: translate(0, 0) scale(1);
  width: inherit;

  &--left {
    align-items: center;
    display: flex;
    height: 56px;
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
      align-items: center;
      flex: 0 0 auto;
      height: 100%;
      display: flex;

      &--tag {
        background-color: $mainYellow;
        border-radius: 2px;
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-size: 10px;
        line-height: 12px;
        font-weight: 500;
        height: fit-content;
        margin-right: 6px;
        padding: 4px 5px;
      }

      &--count {
        color: $mainBlack;
        font-family: 'helvetice-thin', sans-serif;
        font-size: 10px;
        font-weight: 300;
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
    align-items: center;
    display: flex;
    height: 56px;
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
}
</style>