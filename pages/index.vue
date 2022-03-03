<template>
  <main class="container is-fullhd home">
    <section class="sidebar">
      <header class="sidebar--header">
        <h1>Lucas Tostée</h1>
        <h2>_ Full-Stack JS</h2>
      </header>
      <footer class="sidebar--footer">
        <p>_ Welcome to my website, my name is Lucas, I live in Paris, I'm working as a full-stack JavaScript developer.</p>
        <p>I currently maintain more than 100 projects on Github</p>
        <div>
          <a
            v-for="(link, i) in $store.state.footerLinks"
            :key="i"
            :href="link.href"
            target="_blank">
            {{ link.content }}
            <arrow></arrow>
          </a>
        </div>
      </footer>
    </section>
    <section class="projects">
      <header class="projects--header">
        <div class="projects--header--title">
          <h3
          v-for="(t, i) in titles"
          :key="i"
          :class="[t.active ? 'title__active' : 'title__inactive']"
          @click="switchItems(i)">
            {{ t.content }}
            <span>
              {{ 
                Array.isArray($store.state[t.store]) 
                ? $store.state[t.store].length
                : 0
              }}
            </span>
          </h3>
        </div>
        <div class="projects--header--badge">
          <button @click="openActivity">_activity</button>
        </div>
      </header>
      <main class="projects--container" ref="projectContainer">
        <header class="projects--container--header" ref="projectHeader">
          <div>Filename</div>
          <section>
            <div>Id</div>
            <div>{{ filter === 'repos' ? 'Last pushed' : 'Created at' }}</div>
          </section>
        </header>
        <section class="projects--container--items" ref="itemsContainer">
          <div 
          v-if="!$store.state[filter] || !$store.state[filter].length" class="projects--container--items--empty">
            <p>There is no data for this category..</p>
          </div>
          <items
          v-for="(d, i) in $store.state[filter]"
          v-else
          :key="i"
          :active="itemActive.includes(d.id)"
          :media="d.media"
          :itemsType="filter"
          :repoName="d.name"
          :description="d.description"
          :url="d.html_url"
          :repoId="d.id"
          :language="d.language ? d.language : false"
          :topics="d.topics"
          :lastPush="d.pushed_at"
          :type="d.visibility"
          @switchItemActive="function (emitData) { switchItemsActive(emitData, d.id) }"></items>
        </section>
      </main>
    </section>
    <template v-if="$store.state.modals.length">
      <modal 
      v-for="(modalData, i) in $store.state.modals"
      ref="i"
      :key="i"
      :data="modalData"
      @removeModal="$store.commit('REMOVE_MODAL', i)"></modal>
    </template>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

import Arrow from '~/assets/arrow.svg?inline';

export default {
  name: 'Home',
  components: {
    Arrow,
  },
  mounted() {
    this.$refs.itemsContainer.setAttribute('style', `max-height:${this.$refs.projectContainer.clientHeight - this.$refs.projectHeader.clientHeight - 40}px;`);

    this.$refs.itemsContainer.addEventListener('scroll', async (event) => {
      if (!this.$store.state.canFetchRepos) return false;

      const element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        await this.fetchRepo();
      }
    });
  },
  data() {
    return {
      itemActive: [],
      filter: 'app',
      titles: [
        {
          content: 'Products',
          store: 'app',
          active: true,
        },
        {
          content: 'NodeJs Modules',
          store: 'npm',
          active: false,
        },
        {
          content: 'All',
          store: 'repos',
          active: false,
        }
      ]
    };
  },
  methods: {
    ...mapActions(['fetchRepo']),
    openActivity() {
      window.open('https://gitstalk.netlify.app/luctst');
    },
    switchItemsActive(shouldActiveItem, itemId) {
      if (!shouldActiveItem) {
        const newArray = [...this.itemActive];
        newArray.splice(
          newArray.findIndex((i) => i === itemId), 
          1
        );
        this.itemActive = newArray;
        return true;
      }

      this.itemActive.push(itemId);
      return true;
    },
    switchItems(index) {
      const newTitles = this.titles.map((t, i) => {
        const newT = { ...t };
        if (index === i) {
          if (newT.active) return newT;
          this.filter = newT.store;
          newT.active = true;

          return newT;
        };

        newT.active = false;
        return newT;
      });

      this.itemActive = [];
      this.titles = newTitles;
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: $mainLightBg;
  display: grid;
  height: calc(100vh - 40px);
  position: relative;
  padding-top: 40px;

  @media screen and (min-width: 700px) {
    grid-template-columns: auto 1fr;
    column-gap: 12px;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: minmax(auto, 200px) 2fr;
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: minmax(auto, 250px) 2fr;
    column-gap: 0;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: inherit;
    text-align: left;
    justify-content: space-between;

    &--header {
      width: 100%;

      h1,
      h2 {
        font-size: 14px;
        margin: 0;
      }

      h1 {
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-weight: 700;
        margin-bottom: 5px;
        line-height: 17.09px;
      }
  
      h2 {
        color: $mainBlack;
        font-family: 'helvetica-thin', sans-serif;
        font-weight: normal;
      }
    }

    &--footer {
      margin-bottom: 16px;
      max-width: 197px;
      width: 100%;

      p {
        font-family: 'helvetica-thin', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.7px;
        color: $mainBlack;
        margin-bottom: 8px;
      }

      div {
        align-items: center;
        display: flex;

        a {
          align-items: center;
          display: flex;
          color: $mainBlack;
          font-family: 'helvetica-medium', sans-serif;
          font-size: 10px;
          font-weight: 550;
          text-decoration: none;
          line-height: 14.56px;   
          margin-right: 5px;     

          svg {
            height: 8px;
            margin-left: 2px;
            width: 8px;
          }
        }
      }
    }
  }

  .projects {
    display: flex;
    height: 100%;
    flex-direction: column;
    max-height: inherit;

    &--header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      &--title {
        .title__active {
          color: $mainBlack;
          text-decoration: underline;
          padding-bottom: 2px;
        }

        .title__inactive {
          color: $mainGrey;
          text-decoration: none;
        }

        h3 {
          &:hover {
            cursor: pointer;
          }

          align-items: flex-start;
          display: flex;
          font-family: 'helvetica-medium', sans-serif;
          font-weight: 300;
          margin: 0;
          margin-bottom: 6px;

          span {
            font-family: 'helvetica-thin', sans-serif;
            font-weight: 400;
            line-height: 11.93px;
            font-size: 10px;
            margin-left: 5.48px;
            text-decoration: none;
          }

          @media screen and (min-width: 700px) {
            font-size: 34px;
            line-height: 32px;
          }

          @media screen and (min-width: 820px) {
            font-size: 36px;
          }

          @media screen and (min-width: 920px) {
            font-size: 42px;
            line-height: 40px;
          }
          @media screen and (min-width: 1100px) {
            font-size: 52px;
            line-height: 52px;
          }
        }
      }

      &--badge {
        button {
          &:hover {
            cursor: pointer;
          }

          background-color: $secondaryLight;
          border: none;
          border-radius: 2px;
          color: $mainBlack;
          font-family: 'helvetica-medium', sans-serif;
          font-size: 10px;
          font-weight: 550;
          padding: 7px 11px 8px;
          text-align: right;
          outline: none;
        }
      }
    }

    &--container {
      flex-grow: 1;
      height: inherit;
      padding: 0;
      margin-top: 32px;
      position: relative;
      width: 100%;

      &--header {
        align-items: center;
        border-bottom: 1px solid $secondaryGrey;
        display: flex;
        height: 31px;
        max-height: 31px;
        max-width: inherit;
        position: sticky;
        justify-content: space-between;
        width: inherit;

        div {
          color: $mainBlack;
          font-family: 'helvetica-medium', sans-serif;
          font-weight: 500;
          line-height: 17.09px;
          padding-bottom: 8px;

          @media screen and (min-width: 700px) {
            font-size: 13px;
          }

          @media screen and (min-width: 820px) {
            font-size: 14px;
          }
        }

        section {
          display: flex;
          justify-content: space-between;
          width: 100%;

          @media screen and (min-width: 700px) {
            max-width: 150px;
          }

          div:first-child {
            margin-right: 16px;
          }
        }
      }

      &--items {
        height: 100%;
        overflow-y: scroll;

        &--empty {
          width: 100%;
          text-align: center;

          p {
            color: $mainGrey;
            font-family: 'helvetice-thin', sans-serif;
            font-size: 13px;
            font-weight: 300;
          }
        }
      }
    }
  }
}
</style>