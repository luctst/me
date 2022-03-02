export const state = () => ({
  npm: null,
  app: null,
  repos: null,
  canFetchRepos: true,
  reposPage: 0,
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
});

export const mutations = {
  UPDATE_APP(state, a) {
    console.error(a);
    if (Array.isArray(state.app)) {
      state.app.push(...a);
      return true;
    }

    state.app = a;
  },
  UPDATE_NPM(state, n) {
    if (Array.isArray(state.npm)) {
      state.npm.push(...n);
      return true;
    }

    state.npm = n;
  },
  UPDATE_REPOS(state, r) {
    if (Array.isArray(state.repos)) {
      state.repos.push(...r);
      state.reposPage = state.reposPage + 1;
      return true;
    }

    state.repos = r;
    state.reposPage = state.reposPage + 1;
  },
  STOP_FETCH(state, b) {
    state.canFetchRepos = b;
  }
};

export const actions = {
  async fetchProducts({ commit }) {
    const npm = [];
    const app = [];
    const response = await this.$api.get();

    response.data.data.forEach((p) => {
      const objToPush = {};

      objToPush.itemsType = p.attributes.type;
      objToPush.topics = p.attributes.topics;
      objToPush.name = p.attributes.name;
      objToPush.id = p.id;
      objToPush.visibility = p.attributes.visibility;
      objToPush.pushed_at = p.attributes.createdAt;
      
      if (objToPush.itemsType === 'app') {
        app.push(objToPush);
        return true;
      }
      
      npm.push(objToPush);
      return true;
    });

    if (app.length) commit('UPDATE_APP', app);
    if (npm.length) commit('UPDATE_NPM', npm);
  },
  async fetchRepo({ commit, state }) {
    if (state.canFetchRepos) {
      const repos = await this.$axios.$get(
        'user/repos',
        {
          params: {
            sort: 'pushed',
            per_page: 10,
            page: state.reposPage
          },
          headers: {
            Authorization: `token ${process.env.APIKEY}`,
            Accept: 'application/vnd.github.v3+json',
            "User-Agent": "luctst",
          }
        }
      );
      
      if (repos.length) {
        commit('UPDATE_REPOS', repos);
        return true;
      }

      commit('STOP_FETCH', false);
    }

  }
};