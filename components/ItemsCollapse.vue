<template>
  <div class="project--item--meta">
    <div class="project--item--meta--container">
      <div 
      v-for="(a, i) in assets"
      :key="i"
      class="project--item--meta--container--item">
      <div class="project--item--meta--container--item--icon">
        <img 
        v-if="a.extension === '.jpg'"
        :src="`${$store.state.hostName}${a.small.url}`" 
        :alt="a.alt"/>
        <collapsedescription v-if="a.extension === '.md'"></collapsedescription>
        <collapselink v-if="a.extension === 'www'"></collapselink>
      </div>
      <div
      class="project--item--meta--container--item--content"
      title="Click to interact"
      @click.stop="handleModal(a)">{{ a.name }}</div>
      </div>
    </div>
    <div v-if="topics" class="project--item--meta--topics">
      <span v-for="(t, i) in topics" :key="i">{{ t }}</span>
    </div>
  </div>
</template>

<script>
import collapsedescription from '~/assets/collapsedescription.svg?inline';
import collapselink from '~/assets/collapselink.svg?inline';

export default {
  name: 'itemCollapse',
  components: {
    collapsedescription,
    collapselink,
  },
  props: {
    assets: {
      type: [Array, Boolean],
      default: false,
    },
    topics: {
      type: [Array, Boolean],
      required: true,
    }
  },
  methods: {
    handleModal(asset) {
      if (asset.extension === 'www') {
        window.open(asset.name);
        return true;
      }

      this.$store.commit(
        'ADD_MODAL',
        asset.extension === '.md'
        ? {...asset} 
        : {...asset.modal, name: asset.name, extension: asset.extension }
      );
    }
  },
}
</script>

<style lang="scss" scoped>
.project--item--meta {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  flex: 0 0 100%;
  padding-left: 32px;

  &--container {
    display: grid;
    grid-auto-flow: column;
    grid-auto-rows: auto;
    grid-template-rows: repeat(3, auto);
    grid-gap: 12px;

    @media screen and (min-width: 700px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 920px) {
      grid-template-columns: repeat(3, 150px);
    }

    &--item {
      align-items: center;
      display: flex;
      white-space: nowrap;

      &--icon {
        height: 16px;
        width: 16px;

        img {
          object-fit: contain;
          max-height: 100%;
          max-width: 100%;
        }
      }

      &--content {
        border-radius: 2px;
        padding: 2px 4px;

        &:hover {
          background-color: $secondaryLight;
          cursor: text;
        }

        color: $mainBlack;
        font-family: 'helvetica-thin', sans-serif;
        font-weight: 300;
        margin-left: 5px;

        @media screen and (min-width: 700px) {
          font-size: 12px;
        }
      }
    }
  }

  &--topics {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;

    span {
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
  }
}
</style>