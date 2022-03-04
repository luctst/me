<template>
  <section
  v-if="!$store.state.appIsAvailable"
  class="loader">
    <div
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
import Arrow from '~/assets/arrow.svg?inline';

export default {
  name: 'Load',
  components: {
    Arrow,
  },
  created() {
    if (process.client) this.checkAppAvailability();
  },
  methods: {
    updateAppIsAvailable(bool) {
      return this.$store.commit('APP_IS_READY', bool);
    },
    checkAppAvailability() {
      if (window.innerWidth <= 700) {
        if (!this.$store.state.appIsAvailable) return false;
        this.updateAppIsAvailable(false);
      } else {
        this.updateAppIsAvailable(true);
      }

      window.addEventListener('resize', () => {
        if (window.innerWidth <= 700) {
          if (!this.$store.state.appIsAvailable) return false;
          this.updateAppIsAvailable(false);
          return true;
        }

        if (!this.available) {
          this.updateAppIsAvailable(true);
        }
      });
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
  z-index: 30;
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
