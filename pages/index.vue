<template>
  <section>
    <main v-if="showLoader" class="loader" ref="loaderContainer">
      <div ref="innerLoader">
        <template v-for="(c, i) in loaderParse">
          <p v-if="c.active" :key="i" :style="`padding-left:${c.pl}px;`">
            <span>
              <span>
                {{ c.content }}
              </span>
            </span>
          </p>
        </template>
      </div>
    </main>
    <main v-else class="container is-fullhd home">
      <section class="sidebar">
        <header class="sidebar--header">
          <h1>
            <span><span>Lucas Tostée</span></span>
          </h1>
          <h2>
            <span>
              <span> _ Full-Stack JS </span>
            </span>
          </h2>
        </header>
        <footer class="sidebar--footer">
          <p v-for="(f, i) in footerContent" :key="i">
            <span>
              <span :style="`animation-delay:${400 + i * 200}ms;`">
                {{ f }}
              </span>
            </span>
          </p>
          <div>
            <a
              v-for="(link, i) in $store.state.footerLinks"
              :key="i"
              :href="link.href"
              target="_blank"
            >
              <span>
                <span
                  :style="`animation-delay:${1200 + i * 200}ms;`"
                  @click.stop="
                    link.content === 'Mail'
                      ? $ga.event({
                          eventCategory: 'prospect',
                          eventAction: 'click',
                        })
                      : null
                  "
                >
                  {{ link.content }}
                  <arrow></arrow>
                </span>
              </span>
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
              @click="switchItems(i)"
            >
              <span v-for="(l, y) in t.content" :key="y">
                <span
                  :style="`animation-delay:${1200 + 250}ms;`"
                  @animationend="animationEnd"
                >
                  {{ l }}
                </span>
              </span>
              <span v-if="showDivUnderline" class="title--number">
                {{ parseSpanNumber(t.store) }}
              </span>
              <div
                v-if="showDivUnderline"
                :class="[
                  t.active
                    ? 'is__title__underline'
                    : 'is__title__underline__inactive',
                ]"
              ></div>
            </h3>
          </div>
          <div v-if="showDivUnderline" class="projects--header--badge">
            <button @click="openGitStalk">
              <span class="is__blink">_</span>activity
            </button>
          </div>
          <div v-if="showDivUnderline" class="projects--header--banner">
            <div>Filename</div>
            <section>
              <div>Id</div>
              <div>
                {{ filter === 'repos' ? 'Last pushed' : 'Created at' }}
              </div>
            </section>
          </div>
        </header>
        <main v-if="showDivUnderline" class="projects--container">
          <section class="projects--container--items">
            <div
              v-if="!$store.state[filter] || !$store.state[filter].length"
              class="projects--container--items--empty"
            >
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
              @switchItemActive="function (emitData) {switchItemsActive(emitData, d)}"
            ></items>
          </section>
        </main>
      </section>
    </main>
    <section v-if="$store.state.modals.length" class="modal--container">
      <modal
        v-for="(modalData, i) in $store.state.modals"
        ref="i"
        :key="i"
        :data="modalData"
        @removeModal="$store.commit('REMOVE_MODAL', i)"
      ></modal>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import loaderContent from '~/assets/loader.json';
import Arrow from '~/assets/arrow.svg?inline';

export default {
  name: 'Home',
  components: {
    Arrow,
  },
  async mounted() {
    try {
      const strArray = loaderContent[0].split('\n');
      strArray.forEach((el, i) => (this.$set(this.loaderParse, i, { content: el, active: false, pl: Math.floor(Math.random() * ((50 - 0) - 0 + 1) - 0 + 1)})));
      this.isAppAvailable();
      this.fetchReposWhenScroll();

      await Promise.all([ 
        await this.countRepos(),
        await this.fetchRepo(), 
        await this.fetchProducts()
      ]);
      this.dataIsReady = true;
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      showLoader: true,
      dataIsReady: false,
      itemActive: [],
      filter: 'app',
      showDivUnderline: false,
      loaderParse: [],
      footerContent: [
        '_ Welcome to my website, my',
        'name is Lucas, I live in Paris',
        'I\'m working as a full-stack',
        'JavaScript developer.',
        'I currently maintain more than 100 projects on Github.',
      ],
      titles: [
        {
          content: 'Products',
          store: 'app',
          active: true,
        },
        {
          content: 'Node Modules',
          store: 'npm',
          active: false,
        },
        {
          content: 'Github',
          store: 'repos',
          active: false,
        }
      ]
    };
  },
  methods: {
    ...mapActions(['fetchRepo', 'fetchProducts', 'countRepos']),
    animationEnd() {
      this.showDivUnderline = true;
    },
    isAppAvailable() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          if (window.innerWidth <= 700) {
            this.$nuxt.$loading.start();
            return true;
          }
  
          if (!this.available) {
            this.$nuxt.$loading.finish();
          }
        });

        if (window.innerWidth <= 700) {
          this.$nuxt.$loading.start();
          return false;
        }

        this.handleLoader();
        return true;
      });
    },
    handleLoader() {
      const resizeObserver = new ResizeObserver(entries => {
        this.$nextTick(() => entries[0].target.scrollIntoView({block: "end", inline: "nearest", behavior: 'smooth'}))
      });

      resizeObserver.observe(this.$refs.innerLoader);
      let timeoutId;
      let iterator = 0;

      timeoutId = setInterval(
        () => {
          if (this.loaderParse.length === iterator) {
            clearInterval(timeoutId);
            timeoutId = null;
            iterator = 0;
            
            if (!this.dataIsReady) return this.handleLoader();
            resizeObserver.disconnect();
            this.$refs.loaderContainer.classList.add('is__loader__gone');
            setTimeout(() => { this.showLoader = false }, 2000);
            return true;
          }

          this.loaderParse[iterator].active = true;
          iterator = iterator + 1;
          return true;
        },
        100
      );
    },
    fetchReposWhenScroll() {
      window.addEventListener('scroll', async () => {
        if (!this.$store.state.canFetchRepos) return false;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) await this.fetchRepo();
      });
    },
    switchItemsActive(shouldActiveItem, itemData) {
      if (shouldActiveItem) {
        this.$ga.event({ eventCategory: 'project', eventAction: 'click', eventLabel: itemData.name });
      }
      if (itemData.visibility !== 'public') return false;

      if (!shouldActiveItem) {
        const newArray = [...this.itemActive];
        newArray.splice(
          newArray.findIndex((i) => i === itemData.id), 
          1
        );
        this.itemActive = newArray;
        return true;
      }

      this.itemActive.push(itemData.id);
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
    openGitStalk() {
      window.open('https://gitstalk.netlify.app/luctst');
    },
    parseSpanNumber(storeName) {
      if (storeName === 'repos') return this.$store.state.totalRepos;
      return Array.isArray(this.$store.state[storeName]) ? this.$store.state[storeName].length : 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.is__loader__gone {
  animation: opacity100to0 1400ms ease forwards;
}
.loader {
  box-sizing: border-box;
  margin: 40px 40px 0 40px;
  min-height: 100vh;
  position: relative;

  div {
    p {
      font-family: 'helvetica-regular', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 16.7px;
      margin: 6px 0;

      > span {
        display: block;
        overflow: hidden;

        > span {
          display: block;
          animation: fadeIn 500ms ease forwards;
          transform: translateY(100%);
        }
      }
    }
  }
}
.home {
  display: grid;

  @media screen and (min-width: 700px) {
    grid-template-columns: minmax(auto, 26vw) 1fr;
    column-gap: 26px;
    padding-left: 40px;
    padding-right: 40px;
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: minmax(auto, 26vw) 2fr;
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: minmax(auto, 26vw) 2fr;
    column-gap: 0;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 40px);
    max-height: inherit;
    padding-top: 40px;
    text-align: left;
    justify-content: space-between;
    position: sticky;
    top: 0;

    &--header {
      width: 100%;

      h1,
      h2 {
        font-size: 14px;
        margin: 0;

        > span {
          display: block;
          overflow: hidden;

          > span {
            display: block;
            animation: fadeIn 500ms ease forwards;
            transform: translateY(100%);
          }
        }
      }

      h1 {
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-weight: 700;
        margin-bottom: 5px;
        line-height: 17.09px;

        > span {
          > span {
            animation-delay: 200ms;
          }
        }
      }

      h2 {
        color: $mainBlack;
        font-family: 'helvetica-thin', sans-serif;
        font-weight: normal;

        > span {
          > span {
            animation-delay: 400ms;
          }
        }
      }
    }

    &--footer {
      margin-bottom: 40px;
      max-width: 197px;
      width: 100%;

      p:last-of-type {
        margin-top: 8px;
        margin-bottom: 20px;
      }

      p {
        font-family: 'helvetica-thin', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.7px;
        color: $mainBlack;
        margin: 0;

        > span {
          display: block;
          overflow: hidden;

          > span {
            display: block;
            animation: fadeIn 500ms ease forwards;
            transform: translateY(100%);
          }
        }
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
          font-weight: 500;
          text-decoration: none;
          line-height: 14.56px;
          margin-right: 5px;

          > span {
            display: block;
            overflow: hidden;

            > span {
              display: block;
              animation: fadeIn 500ms ease forwards;
              transform: translateY(100%);
            }
          }

          svg {
            height: 6px;
            width: 6px;
          }
        }
      }
    }
  }

  .projects {
    display: flex;
    flex-direction: column;
    max-height: inherit;
    grid-column: 2 / -1;

    &--header {
      align-items: flex-start;
      background-color: $mainLightBg;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      top: 0;
      padding-top: 40px;
      position: sticky;
      z-index: 20;

      &--title {
        .title__active {
          color: $mainBlack;
        }

        .title__inactive {
          color: $mainGrey;
          text-decoration: none;
        }

        .is__title__underline {
          animation: widthLeftToRight 500ms ease forwards;
          background-color: $mainBlack;
          flex: 0 0 calc(100% - 10px);
          height: 3px;
        }

        .is__title__underline__inactive {
          background-color: $mainLightBg;
          flex: 0 0 calc(100% - 10px);
          height: 3px;
        }

        h3 {
          display: flex;
          flex-wrap: wrap;
          width: fit-content;
          overflow: hidden;

          &:hover {
            cursor: pointer;
          }

          align-items: flex-start;
          display: flex;
          font-family: 'helvetica-regular', sans-serif;
          font-weight: 350;
          margin: 0;
          margin-bottom: 6px;

          > span {
            display: block;
            overflow: hidden;

            > span {
              display: block;
              animation: fadeInX 500ms ease forwards;
              transform: translateX(-100%);
            }
          }

          .title--number {
            animation: fadeInX 500ms ease forwards;
            font-family: 'helvetica-regular', sans-serif;
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
        animation: opacityOto100 400ms ease forwards;

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

          span {
            animation: blink 1.3s step-start 0s infinite;
          }
        }
      }

      &--banner {
        animation: opacityOto100 1000ms ease forwards;
        align-items: center;
        border-bottom: 1px solid $secondaryGrey;
        display: flex;
        flex: 0 0 100%;
        height: 31px;
        margin-top: 32px;
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
    }

    &--container {
      will-change: filter;
      filter: blur(0px);
      overflow: hidden;

      &--items {
        animation: opacityOto100 1000ms ease forwards;

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

.modal--container {
  width: 100vw;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
  z-index: 21;

  section {
    pointer-events: all;
  }
}
</style>