export const state = () => ({
  npm: null,
  app: null,
  repos: null,
  canFetchRepos: true,
  reposPage: 0,
  totalRepos: null,
  footerLinks: [
    {
      href: 'mailto:lucas.tostee.dev@gmail.com',
      content: 'Mail',
    },
    {
      href: 'https://github.com/luctst',
      content: 'GitHub',
    },
    {
      href: 'https://dev.to/luctst',
      content: 'Dev.to'
    },
    {
      href: 'https://www.linkedin.com/in/lucas-tost%C3%A9e-97a57711a/',
      content: 'Linkedin'
    }
  ],
  modals: [],
  hostname: process.env.NUXT_ENV_HOSTNAME,
});

export const mutations = {
  ADD_MODAL(state, newModalData) {
    const newModalHeight = newModalData.extension === '.md' ? 324 : newModalData.height;
    const newModalWidth = newModalData.extension === '.md' ? 500 : newModalData.width;
    
    newModalData.top = Math.floor(Math.random() * ((window.innerHeight - newModalHeight) - 0 + 1) - 0);
    newModalData.left = Math.floor(Math.random() * ((window.innerWidth - newModalWidth) - 0 + 1) - 0);
    newModalData.zIndex = 100 + state.modals.length;

    state.modals.push(newModalData);
  },
  COUNT_REPOS(state, repos) {
    state.totalRepos = repos;
  },
  REMOVE_MODAL(state, index) {
    const newModalsArray = [...state.modals];
    newModalsArray.splice(index, 1);
    state.modals = newModalsArray;
  },
  UPDATE_APP(state, a) {
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
      const objToPush = {
        id: p.id,
        description: p.attributes.description,
        html_url: p.attributes.url,
        itemsType: p.attributes.type,
        topics: p.attributes.topics,
        name: p.attributes.name,
        private: p.attributes.is_private,
        pushed_at: p.attributes.createdAt,
        media: p.attributes.media.data ? p.attributes.media.data : false, 
      };
       
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
  async countRepos({ commit}) {
    const data = await this.$axios.$get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `token ${process.env.NUXT_ENV_API_KEY}`,
          Accept: 'application/vnd.github.v3+json',
          "User-Agent": "luctst",
        }
      }
    );

    commit('COUNT_REPOS', data.public_repos);
  },
  async fetchRepo({ commit, state }) {
    if (state.canFetchRepos) {
      const repos = await this.$axios.$get(
        'https://api.github.com/user/repos',
        {
          params: {
            sort: 'pushed',
            per_page: 10,
            page: state.reposPage,
            affiliation: 'owner',
          },
          headers: {
            Authorization: `token ${process.env.NUXT_ENV_API_KEY}`,
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