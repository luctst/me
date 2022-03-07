<template>
  <section
  v-if="!available"
  class="loader">
    <div
    class="loader--not--available">
      <header class="loader--not--available--header">
        <h1>
          <span>
            <span>Lucas Tostée</span>
          </span>
        </h1>
        <h2>
          <span>
            <span>_ Full-Stack JS</span>
          </span>
        </h2>
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
  data() {
    return {
      available: true,
    };
  },
  methods: {
    start() {
      this.available = false;
    },
    finish() {
      this.available = true;
    },
  },
}
</script>

<style lang="scss" scoped>
.loader {
  background: $mainLightBg;
  box-sizing: border-box;
  padding: 0 25px;
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
        font-family: 'helvetica-regular', sans-serif;
        font-weight: 500;
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
        font-family: 'helvetica-regular', sans-serif;
        font-weight: 350;

        > span {
          > span {
            animation-delay: 400ms;
          }
        }
      }
    }

    &--main {
      margin-top: -31px;
      overflow: hidden;

      h3 {
        animation: fadeIn 1000ms ease forwards;
        animation-delay: 600ms;
        color: $mainBlack;
        font-family: 'helvetica-regular', sans-serif;
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
        animation-delay: 1000ms;
        align-items: center;
        display: flex;
        color: $mainBlack;
        font-family: 'helvetica-medium', sans-serif;
        font-size: 12px;
        font-weight: 500;
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
