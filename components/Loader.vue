<template>
  <section class="container loader">
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
        <nuxt-link
        v-for="(link, i) in footerLinks"
        :key="i"
        :to="link.href"
        target="_blank">
          {{ link.content }}
          <arrow></arrow>
        </nuxt-link>
      </footer>
    </div>
  </section>
</template>

<script>
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
      footerLinks: [
        {
          href: 'https://github.com/luctst',
          content: 'GitHub',
        },
        {
          href: 'https://dev.to/luctst',
          content: 'Dev.to'
        },
        {
          href: '',
          content: 'Linkedin'
        }
      ]
    };
  },
  async fetch() {
    await this.$axios.$get('user/repos?sort=pushed&per_page=10');
    this.loading = false;
  },
  created() {
    if (process.client) return this.checkAppAvailability();
  },
  methods: {
    checkAppAvailability() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      if (window.innerWidth <= 700) {
        this.available = false;
      }

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
    }
  },
}
</script>

<style lang="scss" scoped>
.loader {
  background: $mainLightBg;
  padding: 0  15px;

  &--skeleton {
    padding-top: 31px;

    svg {
      animation: fadeIn 1500ms ease;
    }
  }

  &--not--available {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    padding-top: 31px;

    &--header {
      width: 100%;

      h1 {
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-size: 14px;
        font-weight: 700;
        margin: 0;
        margin-bottom: 5px;
        line-height: 17.09px;
      }
  
      h2 {
        color: $mainBlack;
        font-family: 'helvetica-thin', sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
      }
    }

    &--main {
      h3 {
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-weight: 300;
        font-size: 42px;
        line-height: 50.11px;
        margin: 0;

        span {
          color: $mainGrey;
          font-family: 'helvetica-medium', sans-serif;
          font-weight: 300;
          font-size: 42px;
        }
      }
    }

    &--footer {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;

      a {
        align-items: center;
        display: flex;
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-size: 12px;
        font-weight: 550;
        text-decoration: none;
        line-height: 14.56px;

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
