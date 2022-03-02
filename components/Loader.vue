<template>
  <section 
  :class="[containerFullHd && 'is-fullhd']"
  class="container loader">
    <div 
    v-if="loading"
    class="loader--skeleton">
      <loader></loader>
    </div>
    <div
    v-if="!available"
    class="loader--not--available">
      <header class="loader--not--available--header">
        <h1>Lucas Tostée</h1>
        <h2>_ Full-Stack JS</h2>
      </header>
      <main class="loader--not--available--main">
        <h3>Discover all my projects via the <span>desktop version</span> or on Github</h3>
      </main>
      <footer class="loader--not--available--footer">
        <a
        v-for="(link, i) in $store.state.footerLinks"
        :key="i"
        :href="link.href"
        target="_blank">
          {{ link.content }}
          <arrow></arrow>
        </a>
      </footer>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import Loader from '~/assets/loader.svg?inline';
import Arrow from '~/assets/arrow.svg?inline';

export default {
  name: 'Load',
  fetchOnServer: false,
  components: {
    Loader,
    Arrow,
  },
  data() {
    return {
      available: true,
      loading: true,
      containerFullHd: null,
    };
  },
  async fetch() {
    try {
      await this.fetchRepo();
      await this.fetchProducts();
      this.loading = false;
    } catch (error) {
      this.fail(error);
    }

  },
  created() {
    if (process.client) return this.checkAppAvailability();
  },
  methods: {
    ...mapActions(['fetchRepo', 'fetchProducts']),
    fail(error) {
      console.error(error);
    },
    finish() {
      this.loading = false;
      this.available = true;
    },
    checkAppAvailability() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        if (window.innerWidth <= 700) {
          if (!this.available) return false;
          this.available = false;
          return true;
        }

        if (this.available) return false;
        this.available = true;
      });

      if (window.innerWidth <= 700) {
        this.containerFullHd = false;
        this.available = false;
        return false;
      }

      this.containerFullHd = true;
      return true;
    }
  },
}
</script>

<style lang="scss" scoped>
.loader {
  background: $mainLightBg;
  box-sizing: border-box;
  padding: 0  15px;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;

  &--skeleton {
    overflow: hidden;
    margin-top: 40px;

    svg {
      animation: fadeIn 1000ms ease forwards;
      transform: translateY(100%);
    }
  }

  &--not--available {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    padding-top: 31px;


    &--header {
      overflow: hidden;
      width: 100%;

      h1,
      h2 {
        animation: fadeIn 1000ms ease forwards;
        animation-delay: 1000ms;
        transform: translateY(100%);
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

    &--main {
      overflow: hidden;

      h3 {
        animation: fadeIn 1000ms ease forwards;
        animation-delay: 2000ms;
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-weight: 400;
        font-size: 42px;
        line-height: 50.11px;
        margin: 0;
        transform: translateY(100%);

        @media screen and (min-width: 625px) {
          text-align: center;
        }

        span {
          color: $mainGrey;
          font-family: 'helvetica-medium', sans-serif;
          font-weight: 400;
          font-size: 42px;
        }
      }
    }

    &--footer {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 52px;
      overflow: hidden;

      a {
        animation: fadeIn 1000ms ease forwards;
        animation-delay: 3000ms;
        align-items: center;
        display: flex;
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-size: 12px;
        font-weight: 550;
        text-decoration: none;
        line-height: 14.56px;        
        transform: translateY(100%);

        svg {
          height: 8px;
          margin-left: 5px;
          width: 8px;
        }
      }
    }
  }
}
</style>
